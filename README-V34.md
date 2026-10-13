V34 — Sequential Backtest & Honest Evaluation

Fixes the old backtest's overlapping-trade/look-ahead weaknesses. Simulated signals use only data available at signal time, fill on the next candle open, keep one simulated position at a time, include an estimated round-trip cost, apply conservative stop-first handling when SL and TP touch in the same candle, and time-exit long-running trades. Hybrid strategy includes Market Brain BOS/CHoCH/sweep/rejection evidence. Automatic trading remains PAPER-only.

See README-V34-SEQUENTIAL-BACKTEST.md for assumptions and limitations.
