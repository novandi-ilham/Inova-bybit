## V42 Risk/PnL/Auto Trade Hardening

- PAPER history validation and quarantine for implausible PnL records.
- Asia/Jakarta daily-loss accounting and persistent entry lock.
- Auto entry waits when Final Signal and forecast disagree.
- See `README-V42-RISK-PNL-AUTOTRADE-HARDENING.md`.

---

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


## V48 — Wick Reading + Chart Scenario Projection

- Chart now reserves space at the right for two dashed conditional paths: `SIMULASI NAIK` and `SIMULASI TURUN`.
- The active wick-based bias is shown separately as `BIAS`; the paths are scenarios, not guaranteed price predictions.
- Forecast is recalculated from closed candles and current chart data during redraw.
- Wicks are interpreted with follow-through, candle close location, EMA slope, momentum, and nearby support/resistance; a wick alone does not trigger a trade.


## V71 — Fokus Bybit PAPER

- Menghapus koneksi XAUUSD/Twelve Data agar deployment hanya membutuhkan konfigurasi Bybit yang sudah ada.
- `/paper-audit.html` hanya menguji data candle publik Bybit Linear, sampai 1.000 candle per permintaan.
- Audit tetap simulasi historis terpisah; hasilnya tidak boleh dianggap sebagai hasil strategi live sebelum aturan entry/exit yang sama diuji out-of-sample.
- Live trading tetap terkunci secara default melalui `ALLOW_LIVE_TRADING=false`.


## V72 — Entry Lock / Quarantine UI Fix

Fixed the invalid-history notice so the acknowledgement button remains visible. Quarantined legacy transactions remain separate from PAPER balance/performance; the user must acknowledge the quarantine and separately unlock entry after checking risk controls. See `README-V72-ENTRY-LOCK-QUARANTINE-FIX.md`.
