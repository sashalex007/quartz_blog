---
date: "2025-04-23"
---
**Link:** https://leetcode.com/problems/count-good-numbers/
#### Solution:

**Topics**: [[pow(x,n)]]

**Intuition**
Honestly, this is a pretty awesome problem! I really enjoyed solving this one. Basically the number of combinations comes from bit permutation theory. In the even positions there are 5 possibilities (for the 5 even numbers 0-9) and in the odd positions there are 4 (one for each prime). So we have a set of possibilities as such: 

```
[5, 4, 5, 4, 5, 4...]
```

And of course, due to the combination product rule, we must multiply! So we have a simple formula: 

```python
good_nums = 5**((n+1)//2) * 4**(n//2)
```

This is actually too slow though, so we must use binary exponentiation like in [[pow(x,n)]]. I thought caching the function would speed up the solution so I came up with a recursive variation of binary exponentiation, but as it turns out there are not nearly enough cache hits to justify the memory cost- still though the recursive solution is neat.

**Implementation**
```python
def good_nums(n):
	mod = (10**9)+7
	def exp(x, n):
		if n == 0:
			return 1
			
		if n % 2 == 1:
			return x * exp(x, n-1) % mod
		else:
			return exp(x*x%mod, n//2)
			
	even = exp(5, (n+1)//2)
	odd = exp(4, n//2)
	return even*odd%mod


#time: log(n)
#memory: log(n) -due to recursion
```

#review 


