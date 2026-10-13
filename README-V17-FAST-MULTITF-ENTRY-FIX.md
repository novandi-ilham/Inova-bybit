# V17 — Fast Multi-Timeframe Entry Scan Fix

Changes:
- Fixed a timeframe-age bug: early-entry window calculations now use the candidate timeframe being scanned, not the currently displayed chart timeframe.
- Multi-timeframe scan cadence reduced from 14s to 6s, scans up to 12 liquid/momentum pairs across 3m, 5m, 15m, 30m, 1h and current chart timeframe, with bounded concurrency of 12.
- Main scan cadence reduced from 4.5s to 3.5s; switch cooldown reduced to 3.5s and multi-timeframe switch cooldown to 9s to reduce avoidable wait without rapid flip-flopping.
- When no multi-timeframe setup passes the filters, status now says that the scan ran but no setup qualified, rather than appearing frozen.

Safety retained: entry still requires fresh live WebSocket ticker/kline, early-momentum eligibility, anti-chase, directional confirmation, SL/TP and risk checks. This cannot guarantee a profitable trade. Verify in PAPER and review logs before relying on it.
