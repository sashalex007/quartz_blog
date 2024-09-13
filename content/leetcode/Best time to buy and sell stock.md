---
date: 2024-08-19
---
**Link:** https://leetcode.com/problems/best-time-to-buy-and-sell-stock/
#### Solution:

**Topics**: [[greedy]]

**Intuition**
Very simply problem...simply update the min or update the result. Nothing else is required.

**Implementation**
```python
def best_stock(prices):
	res = 0
	buy = prices[0]
	for i in range(1, len(prices)):
		if prices[i] < buy:
			buy = prices[i]
		else:
			res = max(res, prices[i]-buy)
	return res

#time: o(n)
#memory: o(1)
```

#review 


