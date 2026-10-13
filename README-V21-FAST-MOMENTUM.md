# V21 — Fast Momentum Scanner (Bybit)

Perubahan utama:
- Siklus scanner dipercepat menjadi 2.5 detik.
- Cache candle scanner dipersingkat menjadi 2.8 detik agar kandidat lebih segar.
- Universe scan dibatasi 30 pair likuid/momentum untuk mengurangi beban API.
- Auto timeframe mencoba ulang lebih cepat dan tidak lagi memakai ambang 58 untuk pindah timeframe.
- Kandidat awal memakai ambang skor yang lebih fleksibel; tetap wajib lolos validasi arah candle/live ticker sebelum entry.
- Cooldown perpindahan pair dipersingkat, tetapi pembatasan pair setelah loss tetap aktif.
- Auto trade tetap mengikuti Kill Switch dan mode yang dipilih; jangan menganggap momentum sebagai jaminan profit.

Deploy: ekstrak ZIP, unggah isi folder proyek (folder yang berisi package.json, vercel.json, api/, public/) ke Vercel.
