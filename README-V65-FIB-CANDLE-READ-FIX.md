# V65 — Confirmed Swing Fibonacci & Candle Context Fix

Changes:
- Fibonacci no longer anchors to unrelated maximum/minimum prices in a fixed 50-candle window.
- Uses alternating local swing pivots confirmed by two candles on each side; uses completed candles for analysis.
- Fibonacci pullback entry context requires agreement between the confirmed impulse leg, market structure, and EMA slope.
- Chart overlay now draws the anchor swing leg and labels that the pivots are confirmed; it waits when two valid opposite pivots are not available.
- Fibonacci remains context only; it does not guarantee reversals or profitable trades.

Validation performed: `node --check server.js`, `node --check api/index.js`, `node --check public/chart-engine.js`, and `npm run build` passed. No live exchange or historical backtest was performed.
