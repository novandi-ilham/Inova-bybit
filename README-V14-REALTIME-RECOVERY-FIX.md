# V14 — WebSocket reconnect and REST realtime recovery

Changes:
- Switched the public linear WebSocket URL to `wss://stream.bybit.com/v5/public/linear`.
- Fixed reconnect scheduling so reconnect attempts are gated by the active symbol generation rather than incorrectly comparing it to the WebSocket generation.
- Added WebSocket ping heartbeat and a watchdog that also detects failure to receive the first ticker/kline message.
- Runs REST recovery every 3 seconds when WebSocket ticker/kline data is not fresh.
- REST recovery fetches both the latest active candle and ticker so the chart and PAPER unrealized PnL can update if the ticker WebSocket stream stops.
- Recovery status now differentiates ticker success, candle updates, and failures.

Validation performed: JavaScript syntax checks and ZIP integrity checks. This environment cannot verify a live Bybit WebSocket connection or production/Vercel network behavior. Existing open PAPER position data, PnL formulas, fee assumptions, TP/SL values, and exit rules were not intentionally changed.
