---
date: 2024-09-17
---
**Link:** https://leetcode.com/problems/2-keys-keyboard/
#### Solution:

**Topics**: [[DP]], [[math]], [[prime factorization]]

**Intuition**
It should be immediately clear that this is a DP problem because we have two options available to us: copy or paste. We cannot greedily select which one to use (ok, there is a math solution but I'll cover that next), so we are trying to find the shortest subsequence of copies and pastes that reach `n` (shortest = minimum operations). 

It should be clear that the exact combination of copies and pastes cannot be known in advance because there will be a vast number of ways to reach `n` and only one path will be the min path. 

One can imagine that we can copy only once and then paste `n` times for a total operation count of `n+1`, which is effectively the max path...but one that must be considered if `n` is a prime number! Any copy that contains more than 1 character automatically disallows the possibility of reaching a prime number because this would make any number created by a pasting operation a composite number. Since we cannot partially copy the text (reduce the number of characters on our clipboard), the max path must always be considered. 

There is one little implementation trick that I missed on my first solution. Essentially, we don't have to simulate copies and pastes precisely because this creates edge cases that must be handled. For example, if we have chosen to copy then in makes no sense to choose copy again right after...in fact this leads to stack overflow because the number of characters on the notepad will never increase. I got around this be adding a condition `chars != clipboard` to allow copies and avoid stack overflow, but this is not the most elegant solution. 

Basically we can bundle a copy and paste together, and compute this as two calculations! 

**Implementation (DP)**
```python
def two_keys(n):
	if n == 1:
		return 0
	@cache
	def dfs(char, clipboard):
		if char == n:
			return 0
		if char > n:
			return float('inf')

		paste = 1 + dfs(char+clipboard, clipboard)
		copypaste = 2 + dfs(char*2, char)
		return min(paste, copypaste)
		
	return dfs(1, 1) + 1

#time: o(n*n)
#memory: o(n*n)
```

The second way to approach this problem is with prime factorization. Prime factorization is the processes of breaking a number into it's prime factors. According to the fundamental theorem of arithmetic, any integer can be broken down into it's unique primes. How do we leverage this? 

For example:
```
n = 6
factorized = 2*2*2

It can be shown that the optimal way to get 6 'A's on the note pad is to accumulate 2 on the clipboard and paste twice. There is no better way. 

n = 9
factorized = 3*3*3

Likewise for 9...no better way than to accumulate 3 on the clipboard and paste twice.

n = 60
factorized = 2*2*3*5
```

Essentially, the sum of the prime factors is the min operations required. 

**Implementation (prime factorization)**
```python
def two_keys(n):
	ops = 0
	prime = 2
	while n > 1:
		while n % prime == 0:
			n //= prime
			ops += prime
		prime += 1
	return ops

	
```

#review 
#hard  (at least the prime factorization solution is)

