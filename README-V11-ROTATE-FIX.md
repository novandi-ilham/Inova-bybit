# V11 — Risk Sizing + Pair Rotation Fix

Perbaikan utama:

- PAPER AUTO position sizing tidak lagi memakai `margin × leverage` sebagai ukuran risiko.
- Risiko auto-entry dihitung dari hard-loss budget `0.20% equity`, termasuk estimasi fee dan slippage.
- Hard loss exit dikunci ke sekitar batas `0.20% equity` agar tick yang meloncat tidak mencatat loss jauh lebih besar.
- Profit giveback default dinaikkan dari 10% menjadi 35% agar profit tidak terlalu cepat dipotong.
- Setelah satu loss pada sebuah pair, pair tersebut masuk cooldown 30 menit dan engine wajib mencari pair lain.
- Scanner tidak boleh memilih pair yang sedang cooldown.
- Setelah loss, scan dipicu ulang segera; tidak menunggu candle close.
- Negative scans default menjadi 1.
- LONG mendapat preferensi kecil; SHORT hanya dipilih jika evidence SHORT lebih kuat dari LONG.
- Pair loss UI diubah menjadi 1 loss sebagai pemicu cooldown.
- KILL SWITCH tetap OFF saat startup dan harus diaktifkan manual oleh user.
