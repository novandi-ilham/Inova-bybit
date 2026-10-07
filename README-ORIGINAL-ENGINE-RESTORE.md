# Original Engine Restore

This build restores the earlier V11 Paper Engine core that was used before the later V20/V21/V22 strategy changes.

Preserved:
- Bybit-only
- 15M
- Bybit REST + public WebSocket chart
- original pair scanner universe (24 candidates)
- original candle/momentum entry logic
- original pair-loss cooldown/rotation
- original profit giveback behavior (35%)
- hard floating loss cutoff 0.20% equity
- AUTO TRADING OFF at startup
- Emergency Stop separate from Auto Trading

No V22 range/early-structure engine is included.
