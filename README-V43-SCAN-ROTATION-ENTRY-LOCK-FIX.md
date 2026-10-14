# V43 — Scanner and Pair Rotation Continue While Entry Is Locked

## Root cause
The previous build gated the entire multi-pair scanner and cross-timeframe selector behind `!killed`. Since the UI starts with `ENTRY LOCK: ON`, this prevented not only orders but also scanning/automatic chart rotation. The user-visible logs then repeated `ENTRY LOCK ON · entry ditahan`, making the engine appear inactive.

## Changes
- Market scanning and candidate ranking continue while entry is locked.
- Auto timeframe/pair selection can still switch the chart to a stronger candidate when there is no open position.
- When the lock is ON, the engine explicitly enters `SCAN SAJA` behavior and returns before order execution.
- No automatic unlock is performed. A user/risk lock must remain a hard barrier to new orders; daily-loss, invalid-history, or equity protections must not be bypassed.
- Logs show the chosen candidate and explain that no order is sent while locked.

## Verification
- `node --check` passed for the inline browser script and server/API JavaScript files.
- `npm run build` passed (the repository's build script reports Vercel build ready).
- Live exchange execution and Vercel deployment have not been tested from this environment. Validate with PAPER mode first.
