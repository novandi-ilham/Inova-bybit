# Final Signal HOLD / Exit Price Fix

Perubahan lanjutan untuk aplikasi Bybit-only:

- WebSocket publik Linear menggunakan `wss://stream.bybit.id/v5/public/linear`, sesuai dokumentasi Bybit untuk akun yang terdaftar di `bybit.id`.
- Final Signal tidak lagi menjadikan keselarasan forecast sebagai syarat mutlak. Data harus tetap segar, skor setup awal minimal 48/100, dan filter momentum/anti-chase harus lolos. Forecast berlawanan tetap ditampilkan sebagai peringatan risiko.
- Manual close di Paper mode menggunakan harga ticker WebSocket hanya jika pembaruan ticker berumur kurang dari 12 detik. Jika tidak, aplikasi memakai close candle terakhir dan mencatat bahwa ticker tidak segar.
- Tidak mengubah aplikasi menjadi auto-entry atau auto-exit. Tombol BUY/SELL tetap manual; tidak ada jaminan sinyal akan profit.

Validasi yang dilakukan: pemeriksaan sintaks JavaScript dan integritas ZIP. Belum dilakukan verifikasi live pada deployment Vercel pengguna.
