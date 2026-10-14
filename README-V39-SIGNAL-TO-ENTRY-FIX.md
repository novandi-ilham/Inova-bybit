# V39 — Signal-to-Entry Fix

Tujuan: mengatasi kondisi Final Signal BUY/SELL tampil tetapi Auto Trade PAPER tertahan oleh scorer kedua yang lebih ketat.

Perubahan:
- Final Signal dengan skor minimal 45 dapat menjadi fallback bila arah sejalan dengan bias kandidat dan data ticker lolos pemeriksaan kesegaran.
- Auto-entry tidak lagi ditolak hanya karena extension berada antara 0.95–1.60 ATR; batas atas anti-chase yang dipakai konsisten 1.60 ATR.
- Konflik oscillator dicatat sebagai peringatan untuk PAPER, bukan veto otomatis jika Final Signal dan risk guard mengizinkan.
- Manual mode tetap mempertahankan konfirmasi data LIVE dan validasi manual.
- Tetap satu posisi aktif, entry lock, daily loss limit, SL/TP, serta freshness check dipertahankan.

Catatan: ini mengubah keputusan pada jalur PAPER. Belum diuji end-to-end terhadap deployment Vercel/Bybit live; lakukan validasi PAPER terlebih dahulu. Tidak ada jaminan profit.
