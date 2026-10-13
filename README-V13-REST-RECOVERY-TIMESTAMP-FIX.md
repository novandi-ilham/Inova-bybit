# V13 — REST recovery timestamp fix

- Fixed a unit mismatch in REST recovery: `fetchBybitKlines()` returns candle timestamps in seconds, while `applyLiveKline()` expects milliseconds (the WebSocket format).
- Recovery now converts seconds to milliseconds before applying the candle, preventing stale/1970 timestamps from being appended and the visible chart from appearing frozen.
- REST recovery also updates the entry-analysis candle stream so chart and entry analysis remain aligned.
- This patch does not close, recreate, or modify an open PAPER position and does not change PnL, fee, slippage, TP, or SL formulas.

Validation: syntax and ZIP integrity checks; no live exchange test or trading-performance guarantee.
