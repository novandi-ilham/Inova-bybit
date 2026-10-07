# V15 — Serious Risk Engine + Branded Trade Report

BYBIT ONLY · 15M ONLY.

Perubahan utama:
- BUY/SELL sekarang netral; tidak ada bonus arah BUY/SELL.
- Tidak ada gate entry 60% confidence.
- Paper SL memakai jarak adaptif berbasis ATR/market structure (`slDist`), lalu position size dihitung dari risiko 0,20% equity.
- RR mengikuti setting, default 2R.
- Hard floating loss tetap 0,20% equity dan diperiksa setiap tick.
- Setelah 1 loss, pair masuk cooldown dan scanner mencari pair lain.
- Profit giveback baru aktif setelah posisi mencapai minimal +1,25R.
- Kill Switch tetap OFF saat startup dan harus diaktifkan manual.
- History tetap bisa diunduh sebagai CSV.
- Tambahan: history/performance bisa diunduh sebagai PNG atau JPG dengan branding `ILHAM NOVANDI · FUTURES COMMAND CENTER`, ringkasan risk engine, market aktif, dan 12 trade terakhir.

Catatan: ini adalah paper/review engine, bukan jaminan profit. Uji di Demo terlebih dahulu sebelum mempertimbangkan penggunaan dana nyata.
