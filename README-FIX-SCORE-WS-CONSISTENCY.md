# Fix konsistensi skor, entry manual, dan status WebSocket

Pembaruan ini berfokus pada masalah yang tampak di screenshot:

- Final Signal memakai skor setup dari candle 5M tertutup dan menyebut ambang 48 secara konsisten.
- Konflik kuat antara bias setup dan konfluensi Bollinger/RSI/MACD/StochRSI menahan Final Signal agar tidak memberi BUY/SELL yang terlalu percaya diri.
- Entry Paper memakai analisis 5M tertutup yang sama dengan scanner bila histori tersedia, walaupun chart utama sedang pada timeframe lain.
- Tombol BUY/SELL manual menampilkan konfirmasi jika arahnya berlawanan dengan setup 5M atau konfluensi indikator yang kuat.
- Harga entry Paper memakai ticker live jika update ticker berumur kurang dari 12 detik; log mencatat sumber skor dan harga.
- WebSocket tidak dilabeli TICKER LIVE saat socket baru terbuka; label menunggu data pertama yang valid.
- Scanner tetap SCANNER ONLY. Perubahan ini tidak mengaktifkan entry otomatis atau mengirim order live.

## Uji

Jalankan `npm start` atau deploy ke Vercel. Uji dalam PAPER mode terlebih dahulu. Pastikan status data dan ticker benar-benar segar, lalu bandingkan Final Signal, log entry, serta candle 5M. Koneksi Bybit tetap dapat gagal karena jaringan, kebijakan endpoint, atau pembatasan layanan; perubahan UI tidak dapat menjamin WebSocket akan selalu tersambung.
