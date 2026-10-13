# V36 — Pair Hunt, Flexible Scanner

- Scanner universe widened to as many as 50 liquid/momentum USDT linear pairs.
- Candidate display/ranking accepts exploratory candidates from score 25 with extension below 2.25 ATR.
- If no entry-ready candidate exists and the current pair has no ready setup, scanner can rotate the chart to another exploratory candidate instead of remaining idle.
- Auto-entry candidate floor is eased from score 35 to 30; anti-chase threshold widened from 1.60 to 1.85 ATR. Fresh live price, directional validation, one-position rule, and risk guard remain required.
- Stale ticker blocks an entry using unreliable prices but diagnostic now explicitly indicates the scanner continues searching other pairs.

This does not guarantee trades or profits. Paper mode only for validation. The scanner still relies on Bybit public market data and must be observed after deployment.
