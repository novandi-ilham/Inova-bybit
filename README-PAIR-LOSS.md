# V10 Pair Loss Protection

- Hard floating-loss cutoff remains 0.20% of account equity per active position.
- Pair-level consecutive loss tracking is independent per symbol.
- After 3 consecutive closed losing trades on the same pair, that pair is locked for the current trading day/session.
- Any active position on a pair already at the 3-loss limit is force-closed if its current PnL is not positive.
- A winning trade resets that pair's consecutive-loss counter.
- Global consecutive-loss is displayed as statistics only; it no longer blocks other pairs.
