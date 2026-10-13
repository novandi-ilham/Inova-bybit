# Multi-Pair PAPER Auto Trading (V15)

## What changed
- PAPER mode can maintain up to four independent open positions on different USDT linear symbols.
- Scanner chooses an eligible unoccupied symbol rather than requiring the previous symbol's position to close.
- Position state is stored per symbol in `paperPositions` and persisted to browser local storage.
- The selected chart's position continues to use the existing live WebSocket price. Other open positions are monitored by a two-second REST ticker poll and independently checked for SL, TP, max net risk, and trailing-profit giveback.
- Closing a position records a trade-history row with PnL recalculated from entry/exit price, quantity, round-trip fee, and slippage reserve.
- Aggregate used margin is checked before a new entry. Maximum open PAPER positions is hard-coded to four.
- Automatic entry defaults ON in PAPER mode as requested. Switching to DEMO/TESTNET/LIVE turns automatic trading off; no exchange orders are sent by this PAPER engine.

## Risk assumptions retained
- Net profit target to arm trailing: 0.50% of position notional.
- Planned per-position risk limit uses the configured hard-risk sizing (0.20% balance in current engine, capped by existing guard logic).
- Trailing giveback: 20% of peak net PnL.
- Fee and slippage values are interpreted per side; both entry and exit notionals are included in net PnL.

## Validation
- Inline JavaScript syntax checked with `node --check`.
- The ZIP should still be deployed to Vercel as before. On first launch, verify market API access and PAPER balance in the browser console/logs.
- PAPER auto mode can only operate while the page is open and market data requests are working. Background-position prices use REST polling and may be less immediate than the selected symbol's WebSocket feed.
- No profitability is guaranteed; test in PAPER before using any live account.
