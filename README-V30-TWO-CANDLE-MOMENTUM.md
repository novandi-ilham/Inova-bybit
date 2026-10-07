# V30 — TWO CANDLE EARLY MOMENTUM

Added to the restored Bybit 15M Paper Engine:
- Uses the two most recently completed 15M candles for directional confirmation.
- Two bullish completed candles with rising close/body quality can produce an early LONG candidate.
- Two bearish completed candles with falling close/body quality can produce an early SHORT candidate.
- Wick rejection is checked so a two-candle move is not treated as confirmation when the latest completed candle has a strong opposing wick.
- The currently forming candle is context only; it is not treated as a completed candle.
- 60% confidence remains informational and is NOT an entry gate.
- Strong breakout remains an alternate entry path so the scanner does not become unnecessarily slow.
- Bybit-only, 15M engine, existing manual pair switch, CSV/JPG reports and UI remain intact.
