# V33 — Market Brain Engine

This version integrates price-action structure into the decision path rather than drawing labels only.

## Decision inputs
- Swing highs/lows and HH / HL / LH / LL structure when confirmed pivots exist; ATR-normalized drift provides a fallback in smooth trends.
- BOS (Break of Structure) and CHoCH (Change of Character) events.
- Current and prior candle body/wick ratios, wick rejection, close direction, and liquidity sweeps above/below recent ranges.
- EMA slope and ATR-normalized distance, support/resistance proximity, and volume/oscillator evidence already used by the scanner.
- The engine's structure direction and event evidence affect the long/short scores, candidate eligibility, and pair ranking. Scanner cards and chart show the same brain result.

## Auto behavior
- The pair scanner uses market-structure evidence as part of candidate ranking.
- Multi-timeframe scanner continues to evaluate 3m, 5m, 15m, 30m and 1h (plus the active timeframe).
- Entry remains flexible: score alone is not a hard threshold, and wick rejection / breakout / pullback structure can qualify. Existing live-data freshness, one-position rule, cost/R:R check, stop-loss/take-profit, pair cooldown and daily-risk protections remain.
- Automatic order execution is PAPER-only. No live order behavior was enabled by this patch.

## Chart
- Keeps H/L pivot and visible-range labels, trend line, S/R lines, and trade Entry/SL/TP levels.
- Adds a live brain ribbon showing direction, market structure, and BOS/CHoCH/liquidity-sweep event.

## Verification performed
- `node --check` on the inline application JavaScript and `public/chart-engine.js`.
- Synthetic directional-candle smoke test: rising sequence reports LONG / UPTREND / BOS up; falling sequence reports SHORT / DOWNTREND / BOS down.
- `npm run build` completes (the project's configured build command is a readiness echo, not a full framework compile).
- This does not replace live Bybit WebSocket or deployed Vercel testing. Verify in PAPER mode before any use with real funds.
