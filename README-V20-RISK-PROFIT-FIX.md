# V20 — Risk/Profit Sizing Fix

- Paper equity default: Rp500.000.
- Risk/trade presets: 0,5%, 1%, 1,5%, 2%. Default 1%.
- Dengan R:R 1:2, target teoritis per trade: ±Rp5.000 / ±Rp10.000 / ±Rp15.000 / ±Rp20.000 sebelum biaya/slippage.
- Position size Paper dihitung dari risk budget + jarak SL + fee/slippage, bukan dari margin × leverage.
- UI menampilkan Risk Budget, Target 2R, Position Size, dan Required Margin.
- Hard loss cutoff default mengikuti risk/trade dan dapat disetel pada preset yang sama.
- Auto Trading default OFF saat startup; Emergency Stop terpisah.
- Scanner auto-entry hanya berjalan ketika Auto Trading ON.
- Bybit-only; 15M; tidak ada jaminan profit.
