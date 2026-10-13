# V34 — Sequential Backtest & Honest Evaluation

## What changed
- Replaced the previous overlapping backtest loop with a single-position sequential simulation.
- Signal is calculated using candles available at that point only; simulated fill is the next candle open to reduce close-fill look-ahead bias.
- A trade is not opened while another simulated position remains active.
- If stop loss and take profit are both touched within one OHLC candle, stop loss is assumed first (conservative because intrabar ordering is unknown).
- Adds an 80-candle time exit to avoid silently dropping trades that never touch SL/TP.
- Includes a visible-in-summary estimated 0.12% round-trip cost assumption (fees + slippage proxy); actual cost varies by account tier, order type, and market conditions.
- Hybrid strategy considers Market Brain structure/event evidence (BOS, CHoCH, sweep, rejection) without making all indicators agree as a hard gate.
- Stores the latest summary and trade rows in `window.__lastBacktestV34` for browser debugging.

## Notes / limitations
- The simulation uses OHLC candles and cannot know the actual order of high/low within a candle.
- The 0.12% round-trip cost is an estimate, not a Bybit fee quote. Adjust the constant in `runBacktest()` to match the account/order type.
- This is a strategy diagnostic, not proof of profitability. Run multiple pairs/timeframes and compare out-of-sample periods before changing risk settings.
- Automatic execution remains PAPER-only; this patch does not enable live exchange orders.

## Checks
- Inline JavaScript syntax check passed with Node.js.
- `public/chart-engine.js` syntax check passed.
- `npm run build` passes; the project's build command is a readiness echo, not a framework compilation.
