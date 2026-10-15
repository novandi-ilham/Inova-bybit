# V50 — Entry & Pair Engine Responsiveness

Perubahan pada versi ini:
- Mengurangi beban scan lintas timeframe: maksimal 8 pair kandidat dan 5 timeframe, dengan jeda minimal 12 detik.
- Memperpanjang cache kline scanner menjadi 6.5 detik dan membatasi universe scan utama menjadi 22 pair untuk mengurangi permintaan berulang/rate-limit.
- Memprioritaskan entry yang sudah valid pada timeframe aktif sebelum menjalankan scan lintas timeframe, agar perpindahan timeframe tidak menunda setup yang siap.
- Memperbaiki peringkat scan lintas timeframe agar memakai skor setup, freshness, wick rejection, dan jarak dari EMA/ATR; wick rejection membantu penilaian tetapi tidak wajib untuk continuation trend.
- Saat belum ada setup entry yang valid, scanner boleh berpindah ke pair lain yang lebih baik untuk observasi jika selisih skor cukup; perpindahan ini tidak memaksa entry.
- Entry otomatis tetap membutuhkan data pasar segar, arah live yang sejalan, batas extension, Risk Guard, dan konfirmasi ulang setelah memilih pair.
- Auto-entry hanya untuk PAPER pada alur ini; tidak mengirim order sungguhan.

Pemeriksaan yang dilakukan: sintaks JavaScript inline dan file server/API, serta build script proyek.

Catatan: tidak ada sistem yang bisa menjamin arah harga atau profit. Uji pada PAPER dan pantau log scanner/diagnostik sebelum memakai konfigurasi lain.
