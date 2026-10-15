# V52 — Profit Focus (controlled)

Changes from V51:
- Reduced scanner cadence from 3.5s to 3s and rotation cooldown from 2.5s to 1.8s.
- Lowered early-momentum setup threshold from 55 to 52 and widened anti-chase distance from 1.60 to 1.75 ATR.
- Reduced pair-rotation score edge from 5 to 2.5 so the scanner can leave a stale/weak pair sooner.
- Slightly widened the allowed extension for live reversal/entry revalidation.
- Kept market-data freshness checks, one-position rule, stop-loss, daily risk guard, and pair-loss cooldown.

This is a responsiveness adjustment, not a profit guarantee. Validate in PAPER mode and compare net PnL after fee/slippage before enabling real orders.
