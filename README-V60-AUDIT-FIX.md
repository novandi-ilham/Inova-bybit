# V60 — Audit Fixes

Perubahan pada versi ini:
- Menyamakan validasi order pada `server.js` dengan serverless API: validasi simbol, BUY/SELL, quantity finite positif, tipe order, dan harga Limit.
- Menambahkan hard cap nominal order pada server lokal untuk entry baru; close/reduce-only tidak dianggap entry baru.
- Memvalidasi bracket order (SL/TP positif) dan menerapkan hard cap sebelum entry.
- Menyesuaikan hard floating-loss cutoff PAPER menjadi 0,30% ekuitas, sesuai batas risiko yang diminta; risk per trade tetap dipisahkan sebagai konsep konfigurasi tersendiri.
- Mengoreksi estimasi biaya round-trip backtest menjadi 0,14% berdasarkan fee 0,04% per sisi + slippage reserve 0,03% per sisi.
- Mengganti build placeholder dengan pemeriksaan sintaks Node untuk server lokal, API Vercel, dan chart engine.

Catatan verifikasi:
- `node --check server.js`: lulus
- `node --check api/index.js`: lulus
- `node --check public/chart-engine.js`: lulus
- `npm run build`: lulus
- Tidak mengirim order ke Bybit dalam pengujian ini. Order demo/live dan hasil PnL perlu diuji dengan kredensial dan akun yang sesuai sebelum dipakai.
