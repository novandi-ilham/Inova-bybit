# V46 — EMA20 + Price Action / Entry Gate Fix

- Simplified automatic signal model to EMA20 trend + current candle price action.
- Oscillators, MA50, Fibonacci, and separate wick forecast no longer veto the primary setup.
- Support/resistance remains contextual, not a competing directional signal.
- Tightened entry permission to require an eligible setup or a matching, sufficiently strong final signal; removed the permissive fresh/score fallback.
- Fixed early signal evaluation to avoid duplicating the live candle.
- Entry-lock diagnostics identify manual lock, daily loss limit, quarantined history, or non-positive equity.
- Pair scanner is explicitly initialized ON even when an older saved preference had it OFF; scanner/rotation can continue in scan-only mode while entry is locked.
- Safety remains: risk locks still block orders; no live exchange order behavior is enabled by this patch.

Validation: Node syntax check for browser inline JavaScript and ZIP integrity. No live browser/exchange test performed.
