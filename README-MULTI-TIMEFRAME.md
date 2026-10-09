# Multi-timeframe chart

The chart interval selector now loads actual Bybit Linear candle data and subscribes to the matching WebSocket kline topic. Supported intervals: 1m, 3m, 5m, 15m, 30m, 1h, 2h, 4h, 6h, 12h, 1d, 1w, 1M. The custom interval menu accepts those labels or Bybit API codes (1, 3, 5, 15, 30, 60, 120, 240, 360, 720, D, W, M). Switching intervals reloads historical candles and reconnects the kline stream. Pair switching remains available.
