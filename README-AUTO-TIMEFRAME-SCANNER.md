# Auto Timeframe Momentum Scanner

- Adds `AUTO TF: ON/OFF` toggle beside chart tools.
- When enabled, scanner evaluates closed candles across 3m, 5m, 15m, 30m, and 1h for a shortlist built from liquid and active Bybit USDT linear pairs.
- Automatically switches the chart symbol and timeframe only when there is no open PAPER/DEMO position and a candidate is eligible, score >= 58, not in a pair-loss cooldown, and materially stronger than the best eligible setup on the current timeframe (8-point edge).
- Uses bounded concurrency and a short cache to avoid requesting every pair/timeframe combination on every scan. Cross-timeframe scan is throttled to at most once per 14 seconds; timeframe changes have an 18-second cooldown to reduce chart thrashing.
- Manual timeframe selection can be retained by turning `AUTO TF` OFF.
- Scanner changes the chart only; it does not itself open/close orders. Auto-entry is a separate control and remains PAPER-only.
- This is a technical candidate ranking, not a guarantee of profit. Verify behavior on Vercel and use PAPER first.
