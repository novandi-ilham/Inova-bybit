# V38 — REST Ticker Fallback for PAPER Auto Entry

## Akar masalah yang diperbaiki
`runAutoPaperTrade()` sebelumnya menuntut ticker WebSocket segar (`lastWsTickerAt`) walaupun panel REST Recovery sudah berhasil memperbarui harga. Akibatnya UI dapat menampilkan `TICKER OK` tetapi auto-entry terus melaporkan `ticker stale`.

## Perubahan
- Auto-entry menerima ticker WebSocket segar **atau** ticker yang baru diperbarui melalui REST Recovery.
- Candle tetap harus segar dari WebSocket atau REST Recovery.
- Log percobaan entry menandai sumber ticker (`WS` atau `REST fallback`).
- Tetap PAPER-only; tidak mengubah order ke exchange atau menghapus risk guard.

## Verifikasi
- Pemeriksaan sintaks JavaScript inline: lulus.
- Pemeriksaan `public/chart-engine.js`: lulus.
- Integritas ZIP: diperiksa setelah pengemasan.
- Belum diuji live pada deployment Vercel / Bybit milik pengguna.
