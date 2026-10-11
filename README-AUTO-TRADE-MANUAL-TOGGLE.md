# Auto Trade / Manual Toggle

This revision adds an explicit `AUTO TRADE: OFF · MANUAL` toggle in the trading panel.

## Behavior
- Default is MANUAL after every page load; auto mode is not silently restored.
- Auto trading is PAPER-only. It never sends exchange orders.
- When enabled, the engine can open a simulated position only when Final Signal is BUY/SELL, data status is LIVE, the active timeframe has a closed candle, the candidate scorer agrees, the indicator-conflict check passes, the risk guard passes, and no paper position is already open.
- The automatic attempt is limited to one attempt per symbol + timeframe + closed candle + direction to prevent repeated orders on every UI refresh.
- Existing PAPER SL/TP exit handling remains active.
- Selecting DEMO, TESTNET, or LIVE automatically switches auto mode back to MANUAL. Real/demo automatic order placement is intentionally not enabled in this revision.
- ENTRY LOCK continues to block new entries.

## Deploy
Upload this project to Vercel and redeploy. Start in PAPER, test the manual buttons first, then enable AUTO TRADE only if you understand that simulated results do not guarantee live performance.
