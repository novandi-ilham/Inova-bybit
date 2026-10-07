# V17 — EARLY MOMENTUM HANDOFF

## Fokus
Memperbaiki masalah V16 ketika scanner sudah menemukan pair dengan candle bagus tetapi entry terlambat karena menunggu proses chart/pair switch selesai.

## Perubahan utama
- Scanner Bybit Linear 15M dipercepat: interval hunter 1 detik dan candidate universe dipangkas menjadi 12 kandidat prioritas.
- Cache scanner kline diperpendek menjadi ~0,9 detik agar snapshot lebih dekat dengan kondisi live.
- Entry memakai **scanner snapshot Bybit 15M saat ditemukan**, sehingga chart loading tidak lagi menjadi syarat sebelum entry Paper.
- Setelah entry dilakukan, chart pair terpilih disinkronkan di belakang layar dengan REST + WebSocket Bybit.
- Early Momentum Trigger memakai impulse candle saat masih bergerak, bukan menunggu body candle menjadi besar.
- Threshold entry diturunkan secara terukur: impulse/momentum awal, body minimal, volume minimum, close-location, dan jarak dari EMA20.
- Ada anti-chase: candle yang sudah bergerak terlalu jauh atau harga terlalu jauh dari EMA20 ditolak agar sistem tidak membeli/menjual di ujung gerakan.
- Score/confidence 60% tetap **bukan syarat entry**.
- BUY/SELL tetap netral.
- Pair yang baru loss tetap cooldown/rotate.
- Risk 0,20% equity, hard loss 0,20%, profit protection +1,25R, dan kill switch OFF saat boot tetap dipertahankan.

## Prinsip
ENTRY harus terjadi saat momentum **baru terlihat dan masih punya ruang**, bukan setelah candle sudah panjang lalu sistem mengejar.

## Catatan
Early entry tidak menjamin profit. Sistem tetap bisa salah arah. Tujuan V17 adalah mengurangi latency keputusan dan mengurangi entry terlambat/overextended sambil mempertahankan risk guard.

# V18 — PREVIOUS CANDLE / WICK DIRECTION READ

V18 changes entry logic to read the last completed 15M candle before deciding direction. It evaluates body, upper wick, lower wick, close location, prior candle sequence (p/pp/ppp), higher-low/lower-high structure, and then uses the currently forming candle only as an early confirmation. The scanner ranking also prioritizes this previous-candle intent and penalizes late/extended entries. No fixed 60% confidence gate is used.
