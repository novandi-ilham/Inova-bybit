# V37 — Predictive Wick Entry (PAPER)

Fokus versi ini: perpindahan pair harus diikuti evaluasi entry, bukan rotasi terus-menerus.

## Perubahan
- Memperlonggar jendela `fresh` agar momentum aktif dan sinyal wick candle sebelumnya tidak langsung kedaluwarsa.
- Menambahkan setup `PREDICTIVE WICK`: sumbu bawah candle sebelumnya + harga live bergerak naik dapat mendukung BUY; sumbu atas + harga live bergerak turun dapat mendukung SELL.
- Setup wick prediktif dapat lolos walau volume/tren belum sepenuhnya searah, tetapi tetap memerlukan arah harga live, batas extension, tidak menabrak rejection S/R yang kuat, dan target bersih setelah estimasi biaya tetap positif.
- Batas extension scanner diperlebar secara terbatas agar kandidat yang sedang berkembang tidak langsung gugur.
- Tetap PAPER; sinyal candle adalah probabilistik dan tidak dapat mengetahui masa depan secara pasti.

## Validasi
- `node --check` untuk inline JavaScript dan `public/chart-engine.js`.
- `npm run build` hanya menjalankan skrip placeholder `echo Vercel build ready`; ini bukan build penuh framework.
- ZIP perlu diuji pada deployment untuk memastikan ticker/WS Bybit dan entry end-to-end.
