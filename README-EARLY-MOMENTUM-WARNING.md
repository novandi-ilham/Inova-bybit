# Early Momentum Warning

Pembaruan ini menambahkan panel EARLY WARNING pada Final Signal. Panel mengevaluasi candle yang sedang berjalan dengan harga ticker terbaru jika tersedia, dan selalu menggunakan timeframe chart aktif.

Peringatan dini bukan perintah entry. Sinyal final tetap dihitung dari candle tertutup untuk mengurangi false signal. Jika koneksi/data tidak segar, panel menyatakan bahwa data live belum segar. Scanner tetap manual-only dan tidak mengirim order otomatis.

Uji setelah deploy di Vercel pada mode PAPER. Pastikan status Bybit live sehat, kemudian bandingkan EARLY WARNING dengan sinyal final setelah candle ditutup.
