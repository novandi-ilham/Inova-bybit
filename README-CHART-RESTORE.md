# Chart & Market Data Recovery

Perbaikan utama:
- Permintaan data market sekarang mencoba same-origin Vercel API proxy terlebih dahulu, baru mencoba endpoint publik Bybit langsung/fallback. Ini mengurangi kegagalan akibat CORS atau pembatasan jaringan browser seluler.
- Error kline kini menyertakan pair, interval, dan sumber data untuk memudahkan diagnosis.
- Mesin chart canvas, kontrol timeframe, indikator, scanner, dan alur order yang ada tetap dipertahankan.

## Verifikasi setelah deploy
1. Deploy ulang project ke Vercel.
2. Buka `/api/market/diagnostic` dan pastikan `checks.time`, `checks.ticker`, serta `checks.kline` bernilai `true`.
3. Buka chart, pilih BTCUSDT, lalu uji pergantian timeframe.
4. Jika browser menyimpan versi lama, lakukan hard refresh atau hapus cache situs.

Catatan: chart memerlukan respons market Bybit yang valid dari fungsi API Vercel. Perbaikan kode tidak dapat menjamin data tampil jika Bybit/Vercel sedang tidak dapat dijangkau atau endpoint API gagal.
