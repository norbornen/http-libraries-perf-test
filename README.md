# HTTP libraries performance test

My results:
```bash
$ node index.js

http.request GET request x 813 ops/sec ±2.88% (75 runs sampled)
Superagent GET request x 808 ops/sec ±3.25% (76 runs sampled)
Request GET request x 802 ops/sec ±2.98% (76 runs sampled)
Axios GET request x 805 ops/sec ±2.86% (76 runs sampled)
Got GET request x 615 ops/sec ±3.34% (73 runs sampled)
Phin GET request x 941 ops/sec ±2.32% (77 runs sampled)

Fastest is "Phin GET request"




http.request POST request x 842 ops/sec ±3.46% (76 runs sampled)
Superagent POST request x 821 ops/sec ±3.07% (74 runs sampled)
Request POST request x 785 ops/sec ±3.27% (75 runs sampled)
Axios POST request x 734 ops/sec ±4.19% (71 runs sampled)
Got POST request x 585 ops/sec ±3.23% (73 runs sampled)
Phin POST request x 957 ops/sec ±1.67% (80 runs sampled)

Fastest is "Phin POST request"
```
