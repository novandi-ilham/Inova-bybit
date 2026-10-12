# V12 — Recovery & Freshness Guard

- REST recovery now distinguishes intentional AbortError/cancelled requests from actual network/API failures and logs both cases clearly.
- Auto entry requires fresh WebSocket kline and ticker timestamps; REST fallback keeps the chart available but cannot trigger entries from stale/mixed data.
- Invalid live ticker prices are rejected before automatic entry.
- Existing chart, indicator, wick-context, paper risk and profit-guard behavior is preserved.

Validation: JavaScript syntax checks and ZIP integrity check only. This package has not been backtested or tested against live exchange conditions. Use PAPER mode first.
