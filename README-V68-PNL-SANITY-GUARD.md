# V68 — PAPER PnL sanity guard

- Rejects PAPER unrealized PnL calculations when the active price is non-positive, deviates more than 25% from entry, or produces a net PnL outside a 25% position-notional sanity bound.
- Adds a guard in the live PnL refresh path so a stale ticker from another symbol cannot be rendered as a large PnL. In these cases the UI displays a withheld/blank value and logs a diagnostic rather than presenting a fabricated number.
- Keeps the existing round-trip fee and slippage deductions.

This is a defensive guard, not proof of profitability. Validate against the same symbol's live ticker and compare PAPER entry/exit math before relying on it. The 25% price-deviation guard may temporarily withhold PnL during extreme moves; it does not replace source-symbol tagging for market data.
