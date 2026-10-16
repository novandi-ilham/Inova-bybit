# V58 — Pair Probability Estimate (historical proxy)

Perubahan:
- Pair Scanner menampilkan win rate historis sederhana per pair, jumlah trade simulasi, dan hasil dalam unit R.
- Estimasi dihitung dengan walk-forward atas candle yang tersedia: entry pada open candle berikutnya, stop 0.8 ATR, target 1 ATR, dan horizon 3–5 candle tergantung timeframe.
- Jika target dan stop tersentuh pada candle yang sama, dihitung sebagai loss secara konservatif.
- Hasil dengan kurang dari 8 trade tidak menampilkan persentase, dan diberi label sampel belum cukup.
- Win rate historis yang cukup sampel hanya menjadi penyesuaian kecil pada ranking, bukan jaminan profit atau satu-satunya penentu entry.
- Data scanner tetap bersumber dari Bybit. Tidak ada order LIVE yang dikirim oleh estimasi ini.

Catatan: ini adalah estimasi historis sederhana, bukan probabilitas terkalibrasi. Fee, slippage, funding, dan eksekusi riil belum sepenuhnya dimodelkan dalam backtest ini. Uji PAPER terlebih dahulu.
