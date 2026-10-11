# Selective Fast Scanner Update

## What changed
- Scans a focused universe of up to 28 USDT linear pairs selected from liquidity, 24h movement, gainers/losers, and the currently selected pair.
- Uses a bounded worker pool (up to 7 concurrent kline requests) rather than launching every request at once. This reduces scan latency while limiting request bursts.
- Scanner refresh cycle is 7 seconds. Kline results are cached briefly to avoid duplicate REST calls during the same cycle.
- Candidate score combines candle structure, EMA20 slope/position, ATR-normalized movement, volume, breakout/pullback behavior, and secondary Bollinger + RSI + MACD + StochRSI confluence.
- Strong oscillator conflict penalizes and disqualifies a candidate; neutral oscillators do not automatically disqualify it.
- Keeps anti-chase and extreme-volatility guards, pair cooldown after a loss, and selected chart timeframe consistency.
- Candidate panel shows active timeframe and oscillator direction.

## Important
A higher score is a technical setup score, not a probability of profit. No indicator combination can guarantee profit. Scanner pair switching is separate from Auto Trade. Auto Trade remains PAPER-only in this build; it does not send real orders to Bybit. Validate with paper trades and backtests before considering any live execution.
