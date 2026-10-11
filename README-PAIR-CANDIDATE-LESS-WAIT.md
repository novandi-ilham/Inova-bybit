# Pair Candidate Less-WAIT Fix

Perubahan berdasarkan keluhan semua pair terus WAIT:

- Ambang kandidat scanner diturunkan dari 48 ke 42 (skor adalah skor teknikal, bukan probabilitas menang).
- Kriteria momentum awal sekarang menerima continuation searah selain cross EMA, dengan anti-chase maksimal 1.5 ATR.
- Final Signal memakai eligibility kandidat yang sama, bukan juga mensyaratkan `analyzeData().allowed` yang lebih ketat sehingga dua filter saling bertentangan.
- Tombol PAPER memvalidasi arah kandidat, eligibility, data LIVE, konflik oscillator kuat, dan volatilitas ekstrem sebelum entry.
- WAIT tetap berlaku untuk data tidak segar, volatilitas ekstrem, konflik indikator kuat, skor terlalu rendah, atau entry yang sudah terlalu jauh.

Scanner tetap manual-only; perubahan ini tidak mengaktifkan auto-entry atau order real. Skor bukan probabilitas profit.
