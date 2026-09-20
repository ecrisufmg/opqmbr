"""
Privacy rules for the public data bundle.

All suppression decisions live here so they can be tested in isolation and
applied consistently by build_public.py and any future build script.

POLICY REVISION (2026-09-18, user decision — full transparency): person names, every
project title/description and every production title/author are PUBLIC (the data is
what the Plataforma Sucupira already publishes). Real id_pessoa/id_projeto still never
leave the build. **Small-cell suppression is OFF** (SUPPRESSION_THRESHOLD = 0): every
count is published as is. The machinery below is kept, and tested at the old value of
5, so the policy can be reinstated by changing one constant.

Rule summary of the ORIGINAL policy (docs/PLANO.md §3.1-3.2), in force only while
SUPPRESSION_THRESHOLD > 0:
  - Any count with n < 5 → null, flagged as suppressed
  - Percentages rounded to 1 decimal place
  - Complementarity: if A and B are public and C is suppressed but C = total − A − B,
    suppress the second-smallest published cell too
  - No individual rankings
  - Network: only aggregate stats, never edge list
  - Project atlas: surrogate id, cluster, sigla, year, production count and the
    project title for EVERY project (decision 1 of 2026-08-08 limited it to
    clusters with >= 10 members; lifted 2026-09-18). Member names are public too
    (membros_projeto.json), as are production authors (producoes_projeto.json)
  - No text excerpts in public bundle
  - Funding: agency aggregated by program; no project↔agency pairs
"""

import random
import string
from typing import Any

# 0 = no suppression (policy of 2026-09-18). It was 5 until then. Everything below
# reads this global at call time, so setting it back to 5 restores the old rules.
SUPPRESSION_THRESHOLD = 0


def suppress_count(n: int | None) -> dict:
    """Return a cell value dict: {value, suppressed}."""
    if n is None or n < SUPPRESSION_THRESHOLD:
        return {"value": None, "suppressed": True}
    return {"value": n, "suppressed": False}


def safe_percent(numerator: int | None, denominator: int | None, decimals: int = 1) -> float | None:
    """Compute percentage, returning None if either operand is None or denominator is 0."""
    if numerator is None or denominator is None or denominator == 0:
        return None
    return round(100 * numerator / denominator, decimals)


def suppress_row(row: dict[str, Any], count_keys: list[str], total_key: str | None = None) -> dict[str, Any]:
    """
    Apply suppression to a dict of count fields.

    count_keys: names of fields that hold raw counts to suppress.
    total_key: if provided, also applies complementarity suppression:
      if the total is public and only one component is suppressed,
      check that the suppressed value is not reconstructible from
      (total − sum_of_public_parts). If it is, suppress the smallest
      remaining published cell too.
    """
    result = {k: v for k, v in row.items() if k not in count_keys}

    suppressed_cells = []
    published_cells = []
    total = row.get(total_key) if total_key else None

    for key in count_keys:
        val = row.get(key)
        cell = suppress_count(val)
        result[key] = cell
        if cell["suppressed"]:
            suppressed_cells.append(key)
        else:
            published_cells.append((key, cell["value"]))

    # Complementarity: suppressed value is recoverable when total is public
    # and all other parts are published.
    if (
        total_key
        and total is not None
        and total >= SUPPRESSION_THRESHOLD
        and len(suppressed_cells) > 0
    ):
        published_sum = sum(v for _, v in published_cells if v is not None)
        # If exactly one cell is suppressed, its value = total - published_sum.
        # That reveals the suppressed count → suppress the smallest published cell.
        if len(suppressed_cells) == 1 and published_cells:
            smallest_key = min(published_cells, key=lambda x: x[1])[0]
            result[smallest_key] = {"value": None, "suppressed": True}

    return result


def suppress_composition(counts: dict[str, int], total: int | None = None) -> dict[str, int | None] | None:
    """
    Suppression for a whole split into classes (the total is public).

    Differs from `suppress_row` in one way that matters for a stacked bar: an exact
    **zero stays zero**. `suppress_row` goes through `suppress_count`, which hides
    every n < 5 including 0 — fine for a table cell, wrong for a composition, where
    "no project in this class" hides no one and a hatched zero reads as "some".
    Only cells of 1..4 are suppressed, plus the complementary cell when a single one
    would otherwise be recoverable as `total - sum(others)`.

    Returns None (the whole row withheld) when the total is under 2× the threshold:
    with so few members, no cell can be hidden from someone who knows the total.
    A value of None in the result means "suppressed", never "zero".
    """
    total = sum(counts.values()) if total is None else total
    if total < 2 * SUPPRESSION_THRESHOLD:
        return None
    nonzero = [k for k, v in counts.items() if v > 0]
    row = {"_total": total, **{k: counts[k] for k in nonzero}}
    tratado = suppress_row(row, nonzero, total_key="_total")
    return {k: (0 if counts[k] == 0 else tratado[k]["value"]) for k in counts}


def generate_surrogate(length: int = 16) -> str:
    """Random alphanumeric surrogate id for use in place of real database ids."""
    alphabet = string.ascii_lowercase + string.digits
    return "".join(random.choices(alphabet, k=length))


def build_id_map(real_ids: list) -> dict:
    """
    Build a {real_id: surrogate} mapping with random surrogate keys.
    The mapping should be persisted in derivados/id_map.sqlite (never in git).
    """
    return {rid: generate_surrogate() for rid in real_ids}


# ---------------------------------------------------------------------------
# Unit tests (run with:  python3 -m analise.privacidade  or  pytest)
# ---------------------------------------------------------------------------

class _limiar:
    """Troca SUPPRESSION_THRESHOLD por um instante (as funções o leem ao chamar)."""

    def __init__(self, valor):
        self.valor = valor

    def __enter__(self):
        global SUPPRESSION_THRESHOLD
        self.antes, SUPPRESSION_THRESHOLD = SUPPRESSION_THRESHOLD, self.valor

    def __exit__(self, *exc):
        global SUPPRESSION_THRESHOLD
        SUPPRESSION_THRESHOLD = self.antes


def _run_tests():
    # Política atual (limiar 0): nada é suprimido, nem o zero, nem o 1.
    with _limiar(0):
        assert suppress_count(0) == {"value": 0, "suppressed": False}
        assert suppress_count(1) == {"value": 1, "suppressed": False}
        assert suppress_count(None) == {"value": None, "suppressed": True}, "ausente ≠ pequeno"
        row0 = {"total": 50, "a": 45, "b": 3, "c": 0}
        r0 = suppress_row(row0, ["a", "b", "c"], total_key="total")
        assert all(not r0[k]["suppressed"] for k in "abc"), r0
        assert suppress_composition({"a": 4, "b": 3}) == {"a": 4, "b": 3}, "linha curta não é retida"
        assert suppress_composition({"a": 40, "b": 2, "c": 0}) == {"a": 40, "b": 2, "c": 0}
    assert SUPPRESSION_THRESHOLD == 0, "a política em vigor é sem supressão"

    # Regras ANTIGAS (limiar 5), preservadas para poder reinstalá-las.
    with _limiar(5):
        _run_tests_limiar_5()

    # surrogate ids are unique and have correct length
    surrogates = [generate_surrogate() for _ in range(1000)]
    assert len(set(surrogates)) == 1000
    assert all(len(s) == 16 for s in surrogates)

    print("All privacy tests passed.")


def _run_tests_limiar_5():
    # suppress_count
    assert suppress_count(0) == {"value": None, "suppressed": True}
    assert suppress_count(4) == {"value": None, "suppressed": True}
    assert suppress_count(5) == {"value": 5, "suppressed": False}
    assert suppress_count(None) == {"value": None, "suppressed": True}
    assert suppress_count(100) == {"value": 100, "suppressed": False}

    # safe_percent
    assert safe_percent(1, 0) is None
    assert safe_percent(None, 10) is None
    assert safe_percent(1, 3) == 33.3
    assert safe_percent(1, 3, decimals=0) == 33.0

    # suppress_row — basic
    row = {"sigla": "USP", "docentes": 43, "discentes": 3, "externos": 10}
    result = suppress_row(row, count_keys=["docentes", "discentes", "externos"])
    assert result["sigla"] == "USP"
    assert result["docentes"] == {"value": 43, "suppressed": False}
    assert result["discentes"] == {"value": None, "suppressed": True}
    assert result["externos"] == {"value": 10, "suppressed": False}

    # suppress_row — complementarity: suppressed value is recoverable
    # total=50, A=45 published, B=suppressed(2) → B = 50-45 = 5... wait, B<5 so suppressed
    # Let's test: total=50, A=45, B=suppressed(3) → C should suppress smallest published (A)
    row2 = {"total": 50, "a": 45, "b": 3}
    result2 = suppress_row(row2, count_keys=["a", "b"], total_key="total")
    # b is suppressed (3 < 5); a is published (45); a = total - b = 50-3 = 47 → recoverable
    # smallest published cell is a; it should also be suppressed
    assert result2["b"] == {"value": None, "suppressed": True}
    assert result2["a"] == {"value": None, "suppressed": True}

    # suppress_composition — zero stays zero, small cells go, single gap is closed
    assert suppress_composition({"a": 40, "b": 0, "c": 30}) == {"a": 40, "b": 0, "c": 30}
    # 2 alone would be recoverable from the total → the smallest published goes too
    r = suppress_composition({"a": 40, "b": 2, "c": 30, "d": 0})
    assert r == {"a": 40, "b": None, "c": None, "d": 0}, r
    # two small cells: neither is recoverable alone, nothing else is hidden
    r = suppress_composition({"a": 40, "b": 2, "c": 3, "d": 0})
    assert r == {"a": 40, "b": None, "c": None, "d": 0}, r
    # tiny total: the whole row is withheld
    assert suppress_composition({"a": 4, "b": 3}) is None
    assert suppress_composition({"a": 9, "b": 0}) is None
    assert suppress_composition({"a": 10, "b": 0}) == {"a": 10, "b": 0}
    # an explicit total wins over the sum
    assert suppress_composition({"a": 30, "b": 20}, total=50) == {"a": 30, "b": 20}

if __name__ == "__main__":
    _run_tests()
