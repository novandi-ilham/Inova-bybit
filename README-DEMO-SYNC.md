# V10 — BYBIT DEMO SYNC

- Market data: Bybit Linear 15M, one exchange only.
- `BYBIT_BASE_URL=https://api-demo.bybit.com`
- `BYBIT_ACCOUNT_TYPE=UNIFIED`
- `ALLOW_DEMO_TRADING=true`
- `ALLOW_LIVE_TRADING=false`
- `ALLOW_TESTNET_TRADING=false`

## Kill Switch

Kill Switch is always initialized **OFF** on every new page load and is not persisted in localStorage.

- OFF = automatic/manual entries are allowed by the application gate.
- ON = new automatic/manual entries are blocked immediately.
- Existing positions are not silently closed by the UI just because the switch is toggled.
- User must manually toggle it; the website never turns it ON by itself.

## BYBIT DEMO mode

Balance, available balance, unrealized PnL, positions, order execution, close orders and closed-PnL history are read from the Bybit Demo account. Paper mode remains a separate local simulator.

## Paper PnL integrity

Paper closed-trade PnL is calculated from one centralized function including configured fee/slippage. On restore, the displayed realized Paper PnL and win/loss statistics are rebuilt from the saved trade history to prevent drift between balance, history and performance cards.

## Pair loss rule

Each symbol has its own consecutive-loss counter. A win resets that symbol. Three consecutive losses lock only that symbol for the session/day; other pairs remain eligible.

## Floating loss

Paper hard floating-loss cutoff remains 0.20% of current paper equity per active position. Demo mode uses the actual Bybit Demo equity and unrealized PnL for the same 0.20% emergency cutoff.
