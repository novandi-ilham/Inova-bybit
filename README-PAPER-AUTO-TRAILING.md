# PAPER Auto Exit — Net Trailing Profit

Configuration implemented in the PAPER simulator:
- Net profit activation target: 0.50% of entry notional (after simulated costs).
- Maximum-loss cutoff: 0.30% of entry notional (estimated net PnL).
- Fee assumption: `#fee` percent per side; default 0.040% per side.
- Slippage assumption: `#slippage` percent per side; default 0.030% per side.
- Trailing exit: after peak net PnL reaches target, close if current estimated net PnL gives back 25% of the peak, while still positive.

PnL calculation deducts both entry and exit fee estimates and both entry and exit slippage estimates from gross price PnL. Close history recalculates PnL using the recorded exit price and the same function instead of trusting a stale displayed PnL override.

This is a PAPER simulation only. Fee/slippage are assumptions and real fills can differ; this does not guarantee profit or eliminate risk. Check the `#fee` and `#slippage` values before testing. Existing open paper positions retain their old entry/SL/TP values; test the new rules with a newly opened PAPER position.
