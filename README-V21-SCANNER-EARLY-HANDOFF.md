# V21 — BYBIT Scanner / Early Candle Handoff

Perubahan utama:
- Scanner universe diperlebar sampai 48 pair kandidat, tidak hanya 10 mover + 10 volume.
- Scanner tetap menganalisis saat AUTO TRADING OFF; OFF hanya memblokir eksekusi.
- Arah utama dibaca dari candle 15M yang sudah selesai: body, close location, wick atas/bawah, 2–3 candle sebelumnya.
- Candle aktif hanya menjadi konfirmasi agar tidak masuk ketika arah sudah berbalik keras.
- Tidak ada syarat confidence/momentum 60%.
- Ranking lebih mengutamakan early direction dan mengurangi penalti candle aktif yang belum terlalu jauh.
- Setelah LOSS, pair tetap cooldown dan handoff mencari pair lain.
- Profit tetap HOLD; profit protection tetap berjalan.
- Bybit-only, linear futures, 15M.
- AUTO TRADING tetap OFF saat website pertama dibuka; user menyalakan manual.
- `vercel.json` ditambahkan agar deployment ZIP tidak lagi berhenti pada error entrypoint karena struktur ZIP bertingkat.
