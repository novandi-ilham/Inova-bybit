# V59 — Candle Direction Conflict Guard

Perubahan berbasis V58:
- Auto-entry tidak lagi membiarkan Final Signal menimpa arah Pair Scanner saat keduanya berbeda.
- Fallback final signal dibuat lebih ketat: harus searah dengan kandidat, skor minimum 55, dan entry tidak terlalu jauh dari EMA/ATR.
- Tambahan pemeriksaan konteks 3 candle tertutup dan candle berjalan untuk menahan SELL ketika harga memantul naik, atau BUY saat tekanan turun masih jelas.
- Pemeriksaan ini mengurangi beberapa entry yang melawan gerak jangka pendek, tetapi tidak menjamin profit. Uji PAPER terlebih dahulu.

Validasi yang dilakukan: integritas ZIP dan pemeriksaan sintaks JavaScript. Belum ada uji trading langsung di browser.
