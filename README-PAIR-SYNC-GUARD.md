# Pair & Price Synchronization Guard

Perubahan pada versi ini:
- Pair chart ditampilkan lebih menonjol dengan akhiran `LINEAR` agar simbol kontrak yang sedang dibaca jelas.
- Badge `PAIR CHECK` menampilkan status ticker-vs-candle.
- Jika ticker live berbeda lebih dari 7.5% dari candle aktif, panel Final Signal menahan BUY/SELL dan menampilkan alasan mismatch.
- Saat pindah pair, ticker dan timestamp WebSocket di-reset agar harga pair sebelumnya tidak dipakai sementara pair baru sedang dimuat.
- Tetap memakai Bybit V5 linear public market data untuk REST klines dan WebSocket.

Catatan: `OGUSDT` dan `OGNUSDT` adalah dua simbol yang berbeda. Screenshot Bybit menunjukkan `OGUSDT` sekitar 2.78 sedangkan website sekitar 0.259, sehingga salah satu kemungkinan kuat adalah website sedang membuka `OGNUSDT` (atau pair lain), bukan `OGUSDT`. Pastikan simbol persis sama di kedua tempat. Guard ini mendeteksi perbedaan besar antara ticker dan candle untuk simbol website yang sama, tetapi tidak dapat mengetahui simbol yang sedang dipilih pada aplikasi Bybit di perangkat lain.

Validasi sintaks JavaScript dilakukan. Tetap uji di PAPER/demo terlebih dahulu; tidak ada jaminan profit.
