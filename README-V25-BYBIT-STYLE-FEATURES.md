# V25 — BYBIT STYLE FEATURES

Based on V24 Manual Pair Switch. Preserves the original Paper Engine behavior and adds a Bybit-style futures trading panel.

## Added
- Futures / Spot / Options presentation (Futures functional; Spot/Opsi shown as disabled because this app is futures-focused).
- Live Bybit linear order book (top 5 asks/bids) with 2-second refresh and server proxy fallback.
- Live pair price/change and funding display area.
- Leverage selector 1x–100x synced to existing order control.
- Quantity input, 25/50/75/100% sizing shortcuts and slider.
- Market/Limit order selector (Paper Limit remains explicitly blocked until pending-order engine is implemented).
- TP/SL toggle, SL %, R:R, Reduce Only control.
- Long / Short buttons wired to the existing Paper/Demo/Testnet/Live order flow.
- Position / Order / Asset tabs in the Bybit-style panel.
- MA/EMA/BOLL/MARK/SAR visual toggle controls for the chart toolbar; MA/EMA are existing chart concepts, while the new buttons are UI/analysis toggles and do not fabricate exchange orders.

## Safety
- No exchange order is sent in PAPER mode.
- Existing AUTO TRADING and EMERGENCY STOP behavior remains unchanged.
- This is not a profit guarantee.
