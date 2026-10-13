# Patch notes — realtime recovery & order validation

Perubahan pada ZIP ini:

1. `public/index.html`
   - WebSocket reconnect memakai exponential backoff (sekitar 1–30 detik) plus jitter, bukan retry tetap setiap 1,2 detik.
   - Counter reconnect di-reset saat koneksi WebSocket berhasil dibuka.
   - Watchdog dan REST recovery yang sudah ada tetap dipertahankan.

2. `api/index.js`
   - Hard cap nominal sekarang memeriksa order Market berdasarkan harga ticker Bybit di server, bukan hanya order yang mengirim `price`.
   - Order Limit harus mengirim harga positif dan nominalnya diperiksa terhadap hard cap.
   - Bracket order memvalidasi simbol, arah, jumlah, SL/TP, lalu memeriksa nominal sebelum mengirim order.
   - Endpoint close memvalidasi simbol, sisi, dan jumlah; order tetap menggunakan `reduceOnly: true`.
   - Nilai `MAX_NOTIONAL_USDT` dibatasi agar tidak kurang dari 1 USDT.

3. Validasi yang dilakukan
   - `node --check` untuk file JavaScript proyek dan seluruh inline script di `public/index.html`: lulus.
   - Pemeriksaan koneksi langsung ke Bybit dan deployment Vercel tidak dapat disimulasikan dari pemeriksaan ZIP lokal; tetap lakukan tes di deployment.

## Catatan penting sebelum live trading

- ZIP ini belum diuji dengan kredensial Bybit atau lingkungan Vercel milik pengguna.
- `ALLOW_LIVE_TRADING` tetap harus `false` sampai pengujian Demo/Testnet selesai.
- Endpoint order Demo/Testnet harus dilindungi autentikasi server-side sebelum situs publik dipakai; jangan menganggap ALLOW_DEMO_TRADING sebagai autentikasi.
- Jangan menaruh API secret atau trading token di `public/index.html` atau variabel frontend.
