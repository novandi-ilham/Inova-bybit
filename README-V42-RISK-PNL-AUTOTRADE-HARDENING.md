# V42 — Risk Guard, PnL Integrity, Auto Trade Hardening

- PAPER history records are validated before contributing to balance/performance. Implausible PnL records are quarantined in `localStorage` under `ilhamPaperQuarantine` and do not inflate or destroy the displayed wallet.
- Daily PnL is computed using Asia/Jakarta calendar days.
- Risk Guard locks new entries when the daily loss limit or equity floor is breached. The lock state is persisted and no longer forcibly reset to OFF on page startup.
- The account balance display cannot go below zero; the system locks if raw equity reaches zero or less.
- Automatic entry is blocked when the final signal/forecast explicitly disagree or when the oscillator/setup direction conflicts. Manual PAPER overrides remain explicitly confirmed.
- A losing PAPER position is closed using the existing stop/max-risk logic; pair cooldown and daily-risk lock are applied before scanning another pair.
- PAPER only: this patch does not enable automatic exchange orders.

## Important
After deployment, inspect the data-integrity warning and review the quarantined history before unlocking entry. The patch does not guarantee profitable signals and should be validated with fresh PAPER trades/backtests first.
