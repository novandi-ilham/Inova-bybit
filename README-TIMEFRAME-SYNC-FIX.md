# Timeframe Sync Fix

Perbaikan menyamakan timeframe chart, candle data sinyal, scanner, skor setup, oscillator, forecast, countdown candle, notifikasi entry/exit, dan peringatan konfirmasi manual.

- Memilih 5m: seluruh analisis entry menggunakan candle 5m yang sudah tertutup.
- Memilih 15m: seluruh analisis entry menggunakan candle 15m yang sudah tertutup.
- Scanner Bybit mengambil kline dengan interval aktif, bukan interval tetap 5m.
- Riwayat candle untuk engine dimuat ulang ketika timeframe chart berubah.
- WebSocket berlangganan candle timeframe aktif; tidak mencampur candle 5m dengan chart 15m.
- Judul Final Signal, skor, notifikasi, countdown, dan prompt konflik menyebut timeframe aktif.
- Forecast tetap merupakan estimasi teknikal, bukan kepastian. Trading tetap manual; tidak ada auto-order yang diaktifkan.

Validasi lokal: `node --check` pada script inline, `server.js`, dan `api/index.js`; arsip diuji dengan `unzip -t`. Belum diverifikasi terhadap deployment Vercel pengguna.
