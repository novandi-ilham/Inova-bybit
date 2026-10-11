# Profit Runner 20% — Bybit Futures UI

Update for the PAPER engine:
- Once net simulated PnL reaches the existing initial activation threshold (0.50% of position notional), the profit guard activates.
- The simulated stop is moved to entry (break-even reference), the fixed TP is disabled, and the position is allowed to run.
- The engine tracks peak net PnL and closes when current net PnL gives back 20% or more from that peak.
- The existing hard-risk cutoff remains active before the profit guard activates.
- This is PAPER-mode logic only; AUTO TRADE is not connected to real Bybit order execution.

Risk note: no software can guarantee that a stop will never be touched or that exit occurs at the exact threshold. Fast price gaps, stale/disconnected feeds, fees, slippage, and execution delays can produce worse results. A break-even stop at entry is a reference, not a guarantee of zero net loss after fees.
