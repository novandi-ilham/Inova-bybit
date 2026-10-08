# Realtime Candle Fix

Perubahan pada versi ini:

- Bybit public WebSocket menjadi sumber utama candle 15M realtime.
- REST tidak lagi melakukan polling setiap 1,5 detik.
- REST hanya digunakan sebagai recovery saat WebSocket terputus atau tidak mengirim kline selama 8 detik.
- REST tidak boleh menimpa candle aktif jika WebSocket masih sehat.
- REST response yang timestamp-nya lebih tua dari candle terakhir diabaikan.
- History awal tetap diambil dari REST agar chart langsung memiliki data 150 candle.
- Ticker WebSocket tetap digunakan untuk harga/PnL live.

Tujuan utama: mengurangi lag, flicker, dan kasus candle terlihat mundur/loncat karena dua sumber data menulis candle yang sama secara bersamaan.
