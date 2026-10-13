# V15 — Selective Momentum / Net-Risk Gate

Perubahan utama pada `public/index.html`:
- Candidate score tidak lagi cukup sebagai izin entry; ambang kandidat dinaikkan dari 42 ke 56.
- Mewajibkan selisih skor LONG/SHORT minimal 8 poin.
- Memperketat anti-chase (jarak dari EMA20 di bawah 0.70 ATR), konfirmasi volume minimal 0.65, dan filter arah MA50.
- Memblokir entry jika support/resistance terdekat menjadi hambatan, kecuali ada breakout searah.
- Memeriksa rasio reward/risk bersih setelah fee dan slippage sesuai nilai pada UI; minimal net R:R 1.10.
- Menambahkan alasan penolakan supaya pengguna tahu mengapa kandidat tidak layak entry.

Catatan: ini filter risiko, bukan jaminan profit. Tidak ada sistem yang dapat menjamin nol kerugian. Ambang lebih ketat akan mengurangi frekuensi entry dan dapat membuat sistem menunggu lebih lama. Uji di PAPER/backtest sebelum dipakai.
