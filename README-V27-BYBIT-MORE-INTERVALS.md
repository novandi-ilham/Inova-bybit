# V27 — BYBIT MORE INTERVALS

Based on V26. Adds a Bybit-style **More** interval menu matching the supplied screenshots: 1m, 3m, 5m, 15m, 30m, 2j, 6j, 12j, 1H, 1M, 1B, plus custom interval entry.

Important: Paper Engine strategy remains **15M**. These interval choices are visual/reference controls so changing the menu does not silently change the trading engine.

Also adds compact last-price / 24H high / 24H low display derived from the available 15M candles, while preserving Bybit-only market data and the V23/V24 engine behavior.
