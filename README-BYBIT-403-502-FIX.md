# Bybit-only market connection fix

This update keeps all market data on Bybit's official V5 API hosts (`api.bybit.id` first for Indonesia, then the official `api.bybit.com` and `api.bytick.com` fallbacks). It does not use Binance or any other exchange.

Changes:
- Shorter upstream timeout per official host to reduce Vercel function timeouts.
- Market diagnostics now run time, ticker, and kline checks concurrently instead of serially.
- Proxy errors now preserve upstream HTTP status, host, endpoint, and response details so HTTP 403 is distinguishable from a Vercel/function error.
- HTTP 403 rate-limit responses are not retried repeatedly; a second official Bybit hostname is only attempted where useful.
- Browser avoids duplicating the same request after the proxy explicitly reports an upstream HTTP 403.

Important limitation:
A 403 is issued by the upstream service and cannot always be fixed in application code. Bybit documents 403 causes including IP rate limits and region/IP restrictions. If diagnostics still show 403, stop repeated requests and wait at least 10 minutes if the response indicates rate limiting. If it persists, check whether the Vercel outbound IP/location is permitted by Bybit. Do not enable live trading to test market data.

After deployment, open `/api/market/diagnostic`. The response includes `checks`, `errors`, and `diagnosis`. Chart data should only be considered recovered when `checks.kline` is true and actual candles are visible.


**Indonesia endpoint adjustment:** The default `BYBIT_BASE_URL` is now `https://api.bybit.id`, following Bybit's official regional API guidance. If Vercel still receives HTTP 403 from that endpoint, check the full diagnostic response and the deployment region/network restrictions; this code change cannot override an upstream access denial.
