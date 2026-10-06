# Ilham Novandi — Bybit Linear Futures 15M

This build is Bybit-only end-to-end: Bybit Linear USDT market data, 15M candle history, public WebSocket realtime updates, scanner, paper analysis, and server-side account/order endpoints.

## Environment
Use `.env.example` and configure `BYBIT_API_KEY`, `BYBIT_API_SECRET`, `BYBIT_BASE_URL`, `BYBIT_ACCOUNT_TYPE`, and the trading safety flags.

## Architecture
- History: Bybit V5 `/v5/market/kline`, category `linear`, interval `15`.
- Realtime: Bybit V5 public linear WebSocket `kline.15.<SYMBOL>`.
- Scanner: Bybit V5 linear tickers + 15M klines.
- Account: Bybit V5 unified wallet balance + linear positions.
- Orders: Bybit V5 order/create; bracket entry includes full-position TP/SL.
- Paper Engine: same Bybit candles and 15M analysis.
- Hard paper floating-loss cutoff: 0.20% of account equity per position.

Live trading remains disabled unless deliberately enabled on the server.
