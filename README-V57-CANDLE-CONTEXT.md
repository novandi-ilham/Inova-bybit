# V57 — Candle Context & Pair Selection

Perubahan dari V56:
- Skor kandidat kini mempertimbangkan candle sebelumnya, follow-through candle berjalan, struktur swing/CHoCH/BOS, EMA20, wick rejection, dan kedekatan support/resistance.
- Menolak setup saat struktur swing kuat berlawanan, ada wick rejection di zona S/R yang berlawanan, atau dua candle sebelumnya menentang arah tanpa follow-through.
- Memberi penalti pada entry yang mengejar harga dekat resistance/support dan menghargai follow-through.
- Candle masa depan tidak dapat diketahui sebelum terbentuk; konfirmasi lanjutan harus menunggu data candle berikutnya.

Tetap gunakan PAPER untuk pengujian. Skor yang lebih baik tidak menjamin profit dan bisa mengurangi jumlah entry saat sinyal bertentangan.
