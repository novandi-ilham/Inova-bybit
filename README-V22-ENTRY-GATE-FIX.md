# V22 Entry Gate Fix — Bybit

Changes to `public/index.html`:
- Earlier entry window accepts extension up to 1.30 ATR instead of 0.95 ATR.
- Candidate score floor lowered from 52 to 42 and directional edge from 5 to 3.
- Removed oscillator conflict and extreme-volatility as unconditional vetoes; trend, liquidity, rejection, support/resistance, cost, live direction, and risk guard checks remain.
- Widened current-candle move cap to 0.80 ATR.
- Wick forecast alone no longer blocks a trade when the live candle confirms the entry direction.
- Clarified scanner button label.

Automatic entry is still PAPER-only in the browser engine. This is a code-level change, not a guarantee of profit. Validate the behavior in Bybit Demo/Paper first.
