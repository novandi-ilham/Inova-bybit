# V54 — PnL Pair Safety

Perubahan utama:
- PnL paper hanya diperbarui jika simbol posisi aktif cocok dengan simbol chart/ticker.
- Jika chart sedang melihat pair lain, unrealized ditampilkan sebagai tidak tersedia dan posisi tidak dihitung memakai ticker yang salah.
- Harga PnL divalidasi dan hasil yang tidak wajar ditahan.
- Profit puncak/trailing yang rusak di localStorage direset saat restore.
- Penutupan posisi paper ditolak jika chart sedang menampilkan pair yang berbeda, untuk mencegah exit pada harga pair lain.

Tetap uji dalam PAPER. Perubahan ini mencegah pencampuran harga antar-pair; bukan jaminan bahwa semua sumber harga atau spesifikasi kontrak sudah benar.
