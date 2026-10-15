# V51 — Wick Context Labels

Perubahan pada chart canvas:
- Menambahkan label pada sumbu candle yang cukup panjang: SUMBU ATAS/BAWAH, TOLAK ATAS/BAWAH, SUPPORT/RESISTANCE, SWEEP HIGH/LOW.
- Klasifikasi menggunakan OHLC candle, low/high beberapa candle sebelumnya, serta kedekatan ke level support/resistance yang tersedia.
- Label hanya merupakan interpretasi teknikal berbasis kondisi yang terdeteksi; sumbu tidak otomatis berarti support/resistance dan bukan jaminan harga berbalik.
- Menambahkan legenda ringkas di chart.

Verifikasi: `node --check public/chart-engine.js` dan `npm run build`. Belum diuji di browser live/Vercel.
