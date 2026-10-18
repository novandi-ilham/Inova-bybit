# V66 — Auto Timeframe Semua Interval

- Auto Timeframe memeriksa semua interval Bybit Linear yang didukung website: 1m, 3m, 5m, 15m, 30m, 1h, 2h, 4h, 6h, 12h, 1D, 1W, dan 1M.
- Pemindaian dilakukan pada hingga empat pair prioritas (pair aktif, dua pair volume tertinggi, dan satu mover terbesar) untuk mengendalikan jumlah permintaan API.
- Kandidat dibandingkan memakai `rankScore`, sehingga freshness, kekuatan wick/tren, dan ekstensi harga ikut diperhitungkan.
- Auto-switch tetap tunduk pada guard yang sudah ada: setup eligible/fresh, skor minimum, batas ekstensi, tidak ada posisi aktif, serta cooldown.
- Tidak menjamin profit. Validasi di PAPER/backtest sebelum digunakan untuk keputusan trading sungguhan.

Catatan: 1m berarti candle satu menit; 1M berarti candle bulanan.
