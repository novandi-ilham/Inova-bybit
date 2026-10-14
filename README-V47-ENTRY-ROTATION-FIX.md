# V47 — Entry dan Pair Rotation Fix

Perubahan:
- Pada mode PAPER, lock lama yang hanya berasal dari default startup tidak lagi mengunci entry selamanya. Lock manual baru disimpan terpisah (`ilhamManualEntryLock`).
- Lock tetap aktif jika riwayat transaksi perlu dikarantina, daily loss limit tercapai, atau ekuitas PAPER tidak positif.
- Scanner multi-timeframe hanya memindahkan chart bila kandidat benar-benar memenuhi syarat `eligible`, `fresh`, skor minimum, dan batas extension; kandidat sekadar fresh/skor rendah tidak memicu rotasi.
- AUTO TRADE tetap hanya membuka posisi PAPER; tidak mengirim order live ke exchange.

Catatan: tidak ada indikator yang menjamin profit. Uji PAPER terlebih dahulu dan cek log diagnostik jika entry ditahan.
