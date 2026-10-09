# 5M Candle Close Entry

- Entry analysis is fixed to Bybit Linear 5-minute candles, independently from the chart's visual timeframe.
- A decision is made from the most recently completed candle (the still-forming last candle is excluded).
- BUY requires bullish close, close above EMA20, rising EMA slope, positive ATR-normalized momentum, and price extension no more than 1.25 ATR from EMA20.
- SELL uses the inverse conditions.
- Otherwise the signal is HOLD with a reason. This is a manual signal only; it never submits an order.
- Entry 5M history is fetched when the page starts or the symbol changes; the same WebSocket subscribes to both the selected chart kline and the 5M entry kline.
- The alert is shown only for BUY/SELL signals with score >= 60 and is deduplicated by symbol + 5M candle timestamp + side.
