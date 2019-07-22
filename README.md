# HTTP libraries performance test

My results:
```bash
$ node index.js

http.request GET request x 776 ops/sec ±3.56% (73 runs sampled)
Axios GET request x 746 ops/sec ±3.77% (70 runs sampled)
Got GET request x 609 ops/sec ±2.84% (75 runs sampled)
Superagent GET request x 872 ops/sec ±2.97% (78 runs sampled)
Request GET request x 817 ops/sec ±2.92% (77 runs sampled)

Fastest is "Superagent GET request"




http.request POST request x 883 ops/sec ±3.63% (75 runs sampled)
Axios POST request x 741 ops/sec ±3.79% (73 runs sampled)
Got POST request x 596 ops/sec ±2.98% (72 runs sampled)
Superagent POST request x 872 ops/sec ±2.72% (76 runs sampled)
Request POST request x 795 ops/sec ±3.14% (76 runs sampled)

Fastest is "http.request POST request,Superagent POST request"
```
