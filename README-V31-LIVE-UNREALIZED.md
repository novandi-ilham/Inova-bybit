# V31 — LIVE UNREALIZED PNL

- Bybit Linear public WebSocket now subscribes to both `kline.15.SYMBOL` and `tickers.SYMBOL`.
- Paper Unrealized PnL is recalculated from the live ticker price on each WebSocket update, instead of waiting for the 1-second UI timer or 1.5-second REST reconcile.
- Demo mode displays a live mark-price-based Unrealized estimate for the currently viewed position/pair; Bybit account sync remains the authoritative account value.
- Live PnL uses `requestAnimationFrame` to keep UI updates smooth and avoid excessive DOM work.
- Existing 15M candle engine remains unchanged.
- REST remains the fallback when WebSocket is stale/disconnected.
