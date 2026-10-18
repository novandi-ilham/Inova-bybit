# V71 — Fokus Bybit Futures

Perubahan:
- Menghapus route XAUUSD/Twelve Data dan variabel TWELVEDATA_API_KEY.
- Memperbesar batas permintaan candle Bybit menjadi maksimal 1.000 untuk pengujian historis.
- Audit PAPER tetap memakai candle publik Bybit dan menghitung fee/slippage dua sisi.
- Ini belum membuktikan profitabilitas strategi. Audit menggunakan model baseline tersendiri dan belum identik dengan mesin entry utama; validasi lanjutan harus membandingkan sinyal aktual, biaya, drawdown, dan periode out-of-sample.

Buka `/paper-audit.html`, pilih pair dan timeframe, lalu jalankan pengujian. Tidak perlu API key untuk mengambil candle publik.
