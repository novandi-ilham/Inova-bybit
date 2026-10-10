# Scanner All-Pairs / 5M Fix

- Scanner requests Bybit linear USDT kline interval 5 minutes regardless of the chart's display timeframe.
- Universe expands to a turnover-ranked set plus strongest 24h movers and the currently selected symbol (up to 45 symbols).
- Scanner now retains weak/non-eligible candidates and shows a ranked shortlist with score, eligibility, EMA extension in ATR, volume ratio, and rejection reason. This distinguishes “no eligible setup” from “no market data”.
- Pair switching remains manual-safe: it does not place or close orders and only switches to a candidate passing the early setup filter.
- The 2-minute wick forecast is explicitly shown as uncertain rather than reusing the 5-minute candle's direction as if it were reliable.

Validation: inline JavaScript syntax checked with Node and ZIP integrity checked. Live Bybit behavior and historical predictive accuracy have not been verified in this environment. PAPER mode recommended for evaluation.
