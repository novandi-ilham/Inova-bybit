# V41 — Chart POI + BUY/SELL Setup Overlay

- Added shaded approximate Supply/POI and Demand/POI bands based on nearest support/resistance levels.
- Added chart overlay for directional setup: BUY/SELL entry reference, ATR-based indicative SL/target, and confirmation state.
- Added BOS/CHoCH/liquidity event label near the latest candle when the market-structure engine identifies one.
- Preserved existing candle rendering, EMA20, support/resistance, paper trading, and existing risk guards.
- Overlay levels are indicative chart analysis, not a guaranteed forecast. Setup stays marked as awaiting confirmation when existing entry guards do not pass.
- Validation: Node syntax checks passed for chart engine, server, API, and inline scripts. Full live Bybit/Vercel execution was not available in this environment.
