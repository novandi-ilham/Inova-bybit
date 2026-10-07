# V19 — AUTO TRADING CONTROL FIX

## Tujuan
Memisahkan kontrol **Auto Trading** dari **Emergency Stop** agar tombol ON benar-benar berarti mesin boleh melakukan auto-entry.

## Perilaku baru
- Saat website pertama dibuka: **AUTO TRADING = OFF**.
- `AUTO TRADING: OFF`: scanner/market analysis tetap dapat berjalan, tetapi Paper/Demo engine tidak boleh membuka entry otomatis.
- `AUTO TRADING: ON`: scanner + analisis + early-momentum handoff + auto-entry aktif.
- `EMERGENCY STOP: ON`: menghentikan semua auto-entry dan memaksa Auto Trading kembali OFF.
- Mematikan Emergency Stop **tidak otomatis mengaktifkan Auto Trading**; pengguna harus mengaktifkannya manual.
- Manual BUY/SELL tetap hanya diblokir oleh Emergency Stop, bukan oleh Auto Trading OFF.

## Candle analysis
V19 mempertahankan analisis candle/wick V18: candle sebelumnya, body, upper/lower wick, close position, dan beberapa candle sebelumnya digunakan untuk menentukan arah potensial.

## Risk
- Hard loss: 0,20% equity.
- Pair loss: 1 loss → cooldown/rotate.
- Profit protection mulai setelah +1,25R.

## Bybit only
Market data, scanner, WebSocket, Demo/API tetap menggunakan Bybit. Tidak menambahkan sumber Binance.
