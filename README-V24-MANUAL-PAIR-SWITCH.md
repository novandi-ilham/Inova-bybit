# V24 — Manual Pair Switch

Based on V23 Original Engine Restore.

## Added
- `⇄ GANTI PAIR` button in Pair Scanner.
- Manual switch cycles through the latest Bybit scanner universe.
- Current pair is skipped for 15 minutes after a manual switch so Auto Hunter does not immediately return to it.
- Pair-loss cooldown is respected.
- Manual switch does not open a trade by itself; when AUTO is ON, the normal scanner may evaluate the new pair afterward.
- Manual switch is blocked while a paper/demo position is active, preventing chart/pair state from being confused with an open position.
- Existing V23 engine/risk/chart behavior is otherwise preserved.

## Use
1. If the current pair is not suitable, tap `⇄ GANTI PAIR`.
2. The chart moves to the next available scanner pair.
3. The previous pair is skipped for 15 minutes.
4. If you want only manual control, turn `AUTO OFF` before switching.
