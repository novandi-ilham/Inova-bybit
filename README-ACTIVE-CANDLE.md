# V10 Active Candle Entry

- Tidak memakai minimum confidence 60% sebagai syarat entry.
- Entry otomatis membaca arah candle 15M realtime dari Bybit Linear: candle bullish kuat -> BUY, bearish kuat -> SELL.
- Candle berjalan (`confirm=false`) diperbarui via WebSocket sehingga engine tidak menunggu candle 15M selesai.
- Jika posisi sedang loss dan candle 15M berbalik jelas melawan posisi, posisi ditutup segera dan hunter mencari pair lain.
- Hard floating loss 0.20% equity tetap menjadi batas absolut.
- Kill Switch selalu OFF saat halaman baru dibuka dan hanya berubah saat tombol ditekan manual.
- Scanner/hunter berjalan sekitar setiap 3 detik.
- Score/confidence tetap ditampilkan sebagai informasi, bukan gerbang entry.
