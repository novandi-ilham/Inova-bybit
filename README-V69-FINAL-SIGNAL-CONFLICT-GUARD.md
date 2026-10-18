# V69 — Final Signal Conflict Guard

- Final BUY/SELL now requires EMA20 + completed-candle price action to agree with the directional wick forecast.
- If the forecast is opposite or unavailable, Final Signal becomes WAIT and explains the conflict.
- This aligns the visible final decision with the existing auto-entry rule that refuses WAIT signals.
- Manual entry buttons remain manual controls; users can still choose to enter at their own discretion.
- This is a consistency/risk guard, not a guarantee of profitability. Validate in PAPER and backtest before relying on signals.
