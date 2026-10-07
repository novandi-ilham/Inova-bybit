# Risk / PnL Fix — Modal Paper Rp500.000

Perbaikan pada Paper Engine:

- Modal/risk base Paper default Rp500.000.
- Hard loss 0,20% dari equity Paper aktif; dengan modal Rp500.000 batas sekitar Rp1.000 per trade sebelum biaya/slippage.
- Position sizing Paper dihitung dari risk budget, bukan dari margin x leverage.
- Tidak memakai minimum confidence 60% sebagai syarat entry; arah 15M + momentum menentukan BUY/SELL.
- Setelah satu loss, pair masuk cooldown dan engine mencari pair lain.
- Profit giveback tidak lagi memotong winner kecil; baru aktif setelah profit mencapai minimal +1,25R.
- Kill Switch tetap OFF saat startup dan harus dinyalakan manual.

Catatan: PnL futures tetap bergantung pada perubahan harga dan ukuran posisi; biaya/fee dapat mengurangi hasil bersih. Leverage memengaruhi margin/ROI, bukan mengubah rumus dasar PnL untuk ukuran posisi tertentu.
