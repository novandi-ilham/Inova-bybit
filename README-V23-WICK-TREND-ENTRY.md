# V23 — Previous Candle Wick + Trend Entry (Bybit)

## Perubahan
- Entry tidak lagi memakai skor numerik minimum sebagai gerbang keputusan.
- Arah utama ditentukan dari sumbu candle sebelumnya: sumbu bawah dominan untuk potensi pantulan BUY; sumbu atas dominan untuk potensi penolakan SELL.
- Setup juga membaca tren EMA20 dan MA50 serta apakah candle/harga saat ini mengonfirmasi arah tersebut.
- Scanner multi-timeframe dan rotasi pair mengurutkan kandidat berdasarkan kesesuaian wick + trend, bukan skor indikator.
- Filter data live, anti-chase, support/resistance, biaya, SL/TP, batas risiko, dan kill switch tetap dipertahankan.
- Skor tetap bisa tampil sebagai informasi, tetapi tidak menjadi syarat minimum entry.

## Uji
1. Deploy ke Bybit Demo/PAPER terlebih dahulu.
2. Aktifkan Pair Scan, Auto TF, dan Auto Trade PAPER sesuai kebutuhan. Kill Switch harus OFF secara manual.
3. Cek log `AUTO PAPER WICK+TREND CHECK`, yang menampilkan jenis wick candle sebelumnya dan status tren.
4. Jika belum entry, periksa apakah log menyebut data WebSocket stale, candle belum mengonfirmasi, entry terlambat/anti-chase, biaya/risk guard, atau hambatan support/resistance.

Tidak ada jaminan profit. Wick adalah indikasi penolakan harga, bukan kepastian arah berikutnya. Jangan langsung menguji dengan dana live.
