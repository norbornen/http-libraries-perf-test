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




http.request POST request x 875 ops/sec ±2.81% (74 runs sampled)
Axios POST request x 735 ops/sec ±4.06% (74 runs sampled)
Got POST request x 629 ops/sec ±3.49% (75 runs sampled)
Superagent POST request x 886 ops/sec ±2.32% (78 runs sampled)
Request POST request x 792 ops/sec ±2.80% (74 runs sampled)

Fastest is "Superagent POST request,http.request POST request"
```
