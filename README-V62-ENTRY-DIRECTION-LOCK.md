# V62 — Entry Direction Consistency Fix

- Automatic PAPER entry is blocked when Final Signal is WAIT or when scanner direction conflicts with Final Signal.
- Manual PAPER entry no longer allows a confirmation-dialog override when the candidate scorer disagrees with the final signal.
- Scale-in entry must also match the current final signal direction.
- This prevents contradictory BUY/SELL decisions across panels. It does not guarantee profitability; test in PAPER and validate with historical replay before enabling exchange trading.

Validation performed: inline JavaScript syntax check, `server.js` syntax check, `api/index.js` syntax check.
Not performed: live Bybit order test, full end-to-end PAPER replay, or strategy backtest.
