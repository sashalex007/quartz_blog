---
date: 2024-11-08
---
**Link:** https://leetcode.com/problems/climbing-stairs/
#### Solution:

**Topics**: [[DP]], [[math]]

**Intuition**
A simple little problem but I came face to face with a slight misunderstanding that I had about [[DP]]. My initial approach here was to increment the result recursively at the leaf node. I assumed this was fine since the constraints are so low. This is actually a misjudgment of the constraints, because if we take the upper bound, the complexity is `o(2**45)`! This is a massive number. 

What I missed is that we should be caching the result because the tree will have many duplicate branches! For example, the `+2` branch will reach step 4 faster than than the `+1` branch, which means that we can simply save the result and reuse it. Fundamentally, we will be visiting each step many times, so caching is vital. Otherwise we actually have to traverse every branch and that tree is massive. 

**Implementation (DP)**
```python
def climb(n)
	@cache
	def dp(i):
		if i == n:
			return 1
		if i > n:
			return 0
		return dp(i+1) + dp(i+2)
	return dp(0)
	
#time: o(n)
#memory: o(n) #stack
```

If you look carefully at the code above, what we are actually doing is producing the `nth` [[fibonacci]] number! So we can also implement it iteratively in a space optimized way (`o(1)`). 
I'm going to tag this hard, because I fumbled the thought process and complexity, even though I still solved it fast. 

**Review 1**
Neat problem. Remembered that this was just a fib. 

#review 
#hard 

