---
date: 2024-07-21
---
**Link:** https://leetcode.com/problems/lexicographical-numbers/
#### Solution:

**Topics**: [[math]]

**Intuition**
This is a pretty tough problem, probably should not be a medium but overall its not that bad if you can recognize the pattern. The difficulty comes from the fact that it must be solved in `o(n)` time and `o(1)` space. I think the problem remains a medium because `o(nlogn)` solutions are also accepted by the judge.

Consider this:

```
n = 11

lexographically ordered:

[1,10,11,2,3,4,5,6,7,8,9]
```

We notice that 10 immediately follows 1 because a trailing 0 adds the lowest amount of lexicographical value. If `n=100` then the the three first elements would be `[1, 10, 100, ...]`. 
Hopefully the pattern is clear, we must do `curr *= 10` if `curr*10 <= n`....otherwise we increment by one! Half the problem is solved.

If we look at the above example, we see that we must transform `11` into `2`. This is kind of tricky, but we see that if we increment `11` we get `12` which is greater than  `n`, and therefore not part of the list. Its easy to think that we can just take away `10` and get left with a `2`, but if we consider the case where `n=13`, the next lexicographical element after `13` is still `2`! So what's the pattern here?

The key insight is in realizing that after `11`, we must jump to `20` by rounding up to the nearest 10 and then integer divide by 10 to get our 2!

Another case to consider is if `n=200`...in which case at some point in our list we should have `[..., 199, 2, ...]`. If we jump to 200 from 199 and then integer divide once, we are left with `20`...so we must integer divide by 10 WHILE the number is divisible by 10!

**Implementation**
```python
def lexico_nums(n):
	res = []
	curr = 1
	for _ in range(n):
		res.append(curr)
		if curr * 10 <= n:
			curr *= 10
		else:
			curr += 1
			if curr > n:
				curr = ((curr + 9) // 10) * 10 
				# ^round up to nearest 10. The *10 at the end is spurious 
				#  because it gets removed by the integer division that follows.
				#  I'm going to keep it because its a full "rounding up" and
				#  and more in line with the intuition. 
			
			while curr % 10 == 0: #remove trailing zeros
				curr //= 10
				
	return res
	
#time: o(n)
#memory: o(1)
```

**Mnemonic**
`*= 10, += 1, //= 10`
times ten, plus one, integer divide 10

**Review 1**
Very tricky one. I got it but it was a struggle. Its important to remember that if the current number is smaller than `n`, we opportunistically multiply by 10 because this represents the smallest increment in lexicographical value! Otherwise we increment by 1. If the incremented number is greater than n, then we round it up to the nearest 10 and integer divide by 10 until we reach a single digit. 

Also, appending to the result at the start of the loop is more elegant. 

#review 
#hard 


