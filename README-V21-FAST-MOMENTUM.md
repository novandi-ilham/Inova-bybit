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


V22 ENTRY-GATE FIX (2026-10-13)
- Relaxed early momentum freshness/extension thresholds (0.95 -> 1.30 ATR).
- Reduced minimum candidate score (52 -> 42) and directional gap (5 -> 3).
- Removed oscillator-conflict and extreme-volatility as unconditional candidate vetoes; risk, trend, liquidity, rejection, support/resistance and cost checks remain.
- Auto-entry path now accepts the same 1.30 ATR early window and a wider live move cap (0.45 -> 0.80 ATR).
- Wick forecast no longer blocks solely because its forecast disagrees when live candle price direction is confirming; contradictory live candle still waits.
- Clarified AUTO SCAN button wording.
- Still PAPER-only for automatic entries. Test on Bybit Demo/Paper before any live use.
