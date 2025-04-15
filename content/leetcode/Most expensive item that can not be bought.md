---
date: 2024-09-11
---
**Link:** https://leetcode.com/problems/most-expensive-item-that-can-not-be-bought/
#### Solution:

**Topics**: [[DP]], [[math]]

**Intuition**
Not a huge fan of these mathy problems, but this one is pretty neat. We start with one key observation: all numbers after `primeOne * primeTwo` can be formed. Why is this the case? It's some number theory proof that I have no interest in getting into. 

So now that we know the upper bound is `primeOne * primeTwo`, we can use [[DP]] on this problem to find the largest number that **cannot** be formed. 

**Implementation (DP)** 
```python
def most_expensive(primeOne, primeTwo):
	@cache
	def dfs(amount):
		if amount == 0:
			return True
		if amount < 0:
			return False
		return dfs(amount-primeOne) or dfs(amount-primeTwo)
		
	curr = primeOne * primeTwo
	while dfs(curr):
		curr -= 1
	return curr

#time: o((primeOne*primeTwo)**2)
#memory: o(primeOne*primeTwo)
```

There is also an `o(1)` math solution. I suspected this to be the case when I was solving, but I'm not very well versed in number theory. There exists a theorem called the [[chicken mcnugget theorem]]. The theorem states that the largest number that can not be formed with two distinct primes can be directly computed: `mn - m - n`. Yes, its that simple. 

**Implementation (math)**
```python
def most_expensive(primeOne, primeTwo):
	return (primeOne * primeTwo) - primeOne - primeTwo
	
#time: o(1)
#memory: o(1)
```

**Review 1**
What a funky problem! I remembered that we had to use the [[chicken mcnugget theorem]], but I couldn't remember it. I guess that's not a bad thing. The DP solution is also kind of interesting...but you still need to know that `primeOne*primeTwo` is the upper bound. All numbers past this can be formed so in the context of this problem, all gifts that cost more than `primeOne*primeTwo` can be bought....so we can use DP to find a sequence of `primeOne` and `primeTwo` that cannot form the highest number starting from `primeOne*primeTwo-1`, and decrementing. The sum is all that matters, so caching here greatly improves the complexity. 

**Review 2**
Remembered the chicken mcnugget theorem! 

#hard 
#review 


