# ILHAM NOVANDI V14 — Auto Add to Winners (PAPER)

## Included settings
- Automatic PAPER entry nominal: Rp50,000 per stage.
- Simulated leverage: 10x.
- Maximum scale-ins after the initial entry: 3 (maximum four stages total).
- Scale-in requires positive net unrealized PnL, fresh WebSocket ticker and kline, same-symbol/same-direction valid momentum candidate with score >= 60, limited price extension, and live candle movement aligned with the position.
- Adds are limited to one per candle and are disabled when the entry lock is on, the signal reverses, market data is stale, the margin check fails, or recalculated risk exceeds the configured risk budget.
- Average entry, quantity, notional, margin, stop loss, and take profit are recalculated after each add. Existing stop loss is never loosened. Profit Guard and max-risk exits are checked before scale-in.
- Manual PAPER sizing is unchanged. Non-PAPER modes do not use this new Auto Add feature.

## Validation performed
- `node --check` on inline JavaScript and existing JS files.
- `unzip -t` on the final archive.

These checks validate syntax and archive integrity only. They are not a backtest, exchange integration test, or proof of profitability. Trading profits cannot be guaranteed; keep this feature in PAPER until tested thoroughly.
