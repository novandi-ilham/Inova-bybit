# V35 — Auto Entry Diagnostics

V35 menambahkan diagnostik yang terlihat langsung pada panel trading untuk menjelaskan mengapa AUTO PAPER belum membuka posisi.

## Yang berubah
- Panel `AUTO DIAGNOSTIC` menampilkan alasan terakhir: mode bukan PAPER, Entry Lock, posisi aktif, data ticker/kline stale, candle kurang, kandidat belum lolos, entry terlambat, wick berlawanan, momentum belum searah, risk guard, atau percobaan entry.
- Status/log diagnostik dibatasi agar alasan yang sama tidak memenuhi log setiap detik.
- Diam-diam berhenti karena ticker sudah kedaluwarsa sekarang menampilkan alasan eksplisit.
- Tetap PAPER-only; tidak menyalakan LIVE atau mengirim order exchange.

## Cara uji setelah deploy
1. Upload isi ZIP ke GitHub dan deploy ke Vercel.
2. Buka dashboard dan pastikan mode `PAPER`.
3. Tunggu data ticker/kline masuk. Lihat panel `AUTO DIAGNOSTIC`.
4. Bila belum entry, catat alasan yang muncul beserta panel `Market diagnostic` dan log di bagian bawah.
5. Bila muncul `ENTRY PAPER DIKIRIM`, cek `PAPER PERFORMANCE` dan `ACTIVE POSITION ENGINE` untuk memastikan submit berhasil.

## Validasi yang dilakukan
- Syntax JavaScript inline dan `public/chart-engine.js` diperiksa dengan `node --check`.
- ZIP diperiksa dengan `unzip -t`.
- Build script proyek hanya mencetak `Vercel build ready`; ini bukan pengujian end-to-end dan tidak membuktikan runtime Bybit/Vercel.
