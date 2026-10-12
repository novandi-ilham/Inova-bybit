# V5 — Indicator Confluence Engine

Perubahan V5 menghubungkan penilaian indikator ke fungsi `scoreEarlyPair`, yang digunakan oleh scanner dan pemeriksaan kandidat entry. Selain candle/momentum, EMA20, ATR, volume, breakout, wick, dan Bollinger + RSI + MACD + StochRSI, skor kini mempertimbangkan arah MA50, kedekatan support/resistance, dan area retracement Fibonacci 38.2/50/61.8. Toggle indikator chart hanya mengatur visual dan tidak menonaktifkan penilaian engine.

Penting: confluence score adalah aturan heuristik, bukan probabilitas profit. Validasi masih perlu dilakukan dengan backtest yang memasukkan fee/slippage serta paper trading forward test. Tidak ada jaminan profit.
