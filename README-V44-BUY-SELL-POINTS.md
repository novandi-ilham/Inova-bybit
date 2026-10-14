# V44 — BUY-POINT / SELL-POINT chart overlays

## Changes
- Added historical BUY-POINT and SELL-POINT labels to the existing canvas chart.
- A point is marked only after a local pivot is confirmed by the next candle, a reversal candle, and EMA direction/position when EMA data is available.
- Limited the overlay to the most recent eight confirmed points so the mobile chart remains readable.
- Kept the existing supply/demand POI, support/resistance, H/L, trendline, position entry, SL and target overlays.
- The live setup overlay now requires a directional setup score of at least 35 to avoid drawing weak/neutral labels as actionable points.

## Important
These are rule-based technical markers, not guaranteed predictions. Validate using historical replay/backtesting and PAPER trading before relying on them. This update does not enable live exchange order execution.
