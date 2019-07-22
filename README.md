# HTTP libraries performance test

My results:
```bash
➜  http-libraries-perf-test git:(master) ✗ node index.js
http.request POST request x 669 ops/sec ±3.15% (76 runs sampled)
http.request GET request x 707 ops/sec ±2.95% (78 runs sampled)
Axios POST request x 615 ops/sec ±4.42% (72 runs sampled)
Axios GET request x 665 ops/sec ±3.38% (77 runs sampled)
Got POST request x 509 ops/sec ±3.17% (76 runs sampled)
Got GET request x 565 ops/sec ±3.45% (78 runs sampled)
Superagent POST request x 693 ops/sec ±2.21% (77 runs sampled)
Superagent GET request x 694 ops/sec ±2.16% (77 runs sampled)
Request POST request x 527 ops/sec ±7.08% (66 runs sampled)
Request GET request x 538 ops/sec ±8.93% (66 runs sampled)

Fastest is "http.request GET request"
```

I'm not suprised that bare `http.request` is the fastest. But I can't explain why `axios` and `request` are so slow.
