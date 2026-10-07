# V22 — LOSS QUALITY FIX / EARLY STRUCTURE HANDOFF

BYBIT-only, 15M paper/demo trading dashboard.

## Main changes
- Scanner no longer treats a 60% confidence number as an entry gate.
- Entry is based primarily on the last completed 15M candle, its body, wick, close location, 2–3 candle structure, EMA slope and early confirmation from the live candle.
- RANGE is no longer an automatic entry environment. The scanner keeps looking for a cleaner pair.
- Direction must have a structural edge; this is not a percentage-confidence gate.
- Scanner universe remains broad (up to 40 candidates) with a 2.5s cycle and 3s kline cache to reduce API hammering.
- One losing pair is cooled down and the engine rotates to another usable setup.
- Hard floating-loss cutoff is fixed at 0.20% of equity, independent from Risk / trade sizing.
- Hard-loss cutoff is checked before candle-reversal exits and hard-loss records are clamped to the 0.20% cap in Paper history.
- Break-even is delayed to +1.25R so small winners are not immediately squeezed to tiny profits.
- Profit giveback protection starts only after +1.25R and keeps at least +0.75R when possible.
- AUTO TRADING remains OFF on startup; EMERGENCY STOP is separate.

## Risk model
Risk / trade controls position sizing and target planning (0.5%, 1%, 1.5%, 2%).
The 0.20% hard-loss cutoff is an emergency protection layer and is intentionally separate.

## Important
Paper/demo validation is required before any real-money use. No profit is guaranteed.
