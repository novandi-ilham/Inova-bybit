# V6 — Paper Risk & PNL Fix

Fixes based on the reported PAPER history:

- Corrected a unit mismatch: the entry path previously stored `risk` as a fractional ratio (0.002) while the max-risk guard interpreted it as IDR. That could trigger `PAPER MAX RISK` almost immediately. It now stores the calculated IDR risk budget (`riskMoney`).
- Max-risk exits now record the actual calculated net PNL at the exit price instead of replacing the trade result with the theoretical risk cap.
- Very small non-zero IDR PNL is shown with two decimals rather than misleading `Rp -0`.

Validation: syntax checks and ZIP integrity checks were run. This is not a profitability guarantee; test in PAPER mode and review fee/slippage assumptions before any live trading.
