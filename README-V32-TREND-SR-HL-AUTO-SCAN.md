# V32 — Trend, Wick, S/R, H/L and Flexible Auto Scan

## Changes
- Auto-pair scanner can rank fresh directional candidates even when the strict `eligible` flag is not met, while still prioritizing eligible setups.
- Auto-timeframe scanner can consider moderate-score/fresh setups and less aggressively reject extensions, improving the chance of switching to an active market.
- Early entry window widened to 60% of the current candle; live candle displacement tolerance widened to 0.80 ATR; extension allowance widened to 1.60 ATR.
- Wick/trend setup remains a strong signal but a clear directional candle or pullback turn can also qualify. Nearby support/resistance is treated as context; it blocks only when the wick shows a clear rejection.
- Support/resistance calculation uses recent local swing pivots with rolling high/low fallbacks.
- Chart always displays S/R levels, H/L labels for visible extremes and local pivots, and a trend line between recent swing points.
- Existing live price freshness checks, one-position limit, stop-loss/take-profit checks, pair cooldown, and daily loss guard are retained.

## Notes
- Automatic order execution remains restricted to PAPER mode in the existing product design. Demo/Testnet/Live order execution is not enabled by these changes.
- A signal is not a profit guarantee. Verify in PAPER mode before considering any real funds.
