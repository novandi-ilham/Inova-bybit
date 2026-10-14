# V40 — REST Recovery Entry Unblock

- Fixed the exact blocker shown in the screenshot: manual PAPER entry was hard-blocked unless the display label started with `LIVE`, so a fresh `REST RECOVERY · 0s` was rejected even when the REST ticker had just updated.
- Entry freshness now checks actual timestamps: recent WebSocket ticker/kline or recent successful REST sync plus available candle history.
- Stale market data still blocks entry; risk checks, signal alignment, and PAPER-only automatic trading remain in place.
- Validation: inline JavaScript syntax and ZIP integrity checked. End-to-end Bybit/Vercel runtime was not available in this environment.
