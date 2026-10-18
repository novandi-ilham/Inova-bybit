# V72 — Entry Lock / History Quarantine UI Fix

## Fix
- Fixed a UI bug where restoring invalid legacy PAPER trade history set `dataIntegrityNotice.textContent`, removing the nested `AKUI DATA DIPISAHKAN` button from the DOM.
- Split the notice text into `dataIntegrityMessage` so the acknowledgement button remains available.
- Clarified that quarantined legacy trades are excluded from PAPER balance/performance and retained separately in local storage under `ilhamPaperQuarantine`.
- Acknowledging quarantine does not silently disable the safety lock. User must separately review risk and turn ENTRY LOCK off manually; daily-loss/equity risk locks remain enforced.

## Validation
- `npm run build`
- `node --check` for server, API, chart engine, and inline page script

This UI fix does not prove strategy profitability. Continue PAPER testing and verify net PnL after fees/slippage.
