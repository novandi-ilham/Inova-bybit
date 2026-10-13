# V16 — PAPER auto-entry activation and scanner gate reconciliation

Changes in `public/index.html`:
- PAPER auto-entry now starts enabled by default (`AUTO TRADE: ON · PAPER`); this changes simulation behavior only and sends no exchange orders.
- Candidate gate adjusted from score 56 / direction gap 8 / EMA extension 0.70 ATR / volume 0.65x / net R:R 1.10 to score 52 / gap 5 / extension 0.95 ATR / volume 0.55x / net R:R 1.00.
- Multi-timeframe scanner candidate floor reduced to 52 and its extension allowance widened to 1.5 ATR so viable candidates can be considered across 3m/5m/15m/30m/1h.
- Removed a duplicate strict `analyze().allowed` check from the shared auto-entry risk guard. The candidate scorer still validates momentum, freshness, EMA distance, volatility, wick rejection, oscillator conflict, support/resistance, and estimated net reward/risk. The guard now only enforces hard safety blocks (kill switch, pair cooldown, existing position, daily loss limit).
- Preserves PAPER-only execution; no live Bybit order is sent.

Validation: `public/index.html` inline JavaScript syntax checked with Node; ZIP integrity checked.

Limitations: no direct Bybit/Vercel runtime test or backtest was possible here. A valid signal is not a guarantee of profit. This build retains the existing single-PAPER-position architecture; it does not implement four simultaneous per-symbol positions.
