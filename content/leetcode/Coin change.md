---
date: 2024-11-10
---
**Link:** https://leetcode.com/problems/coin-change/
#### Solution:

**Topics**: [[DP]]

**Intuition**
Another very easy DP problem. Nothing to say about this one. Took me 30 seconds. 

**Implementation**
```python
def coin_change(coins, amount):
	@cache
	def dp(total):
		if total == 0:
			return 0
		if total < 0:
			return float('inf')
			
		min_coins = float('inf')
		for coin in coins:
			min_coins = min(min_coins, 1 + dp(total-coin))
		return min_coins
		
	res = dp(amount)
	return res if res != float('inf') else -1

#time: o(amount*len(coins))
#memory: o(amount)
```

#review 


