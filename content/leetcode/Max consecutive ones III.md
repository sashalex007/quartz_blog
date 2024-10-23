---
date: 2024-08-15
---
**Link:** https://leetcode.com/problems/max-consecutive-ones-iii/
#### Solution:

**Topics**: [[sliding window]]

**Intuition**
This is a very nice and practical sliding window problem. It may be more relevant to call this a [[conditional sliding window]]. This type of sliding window has three properties:

1. A fixed dependency for a condition (in this case k)
2. A loop (typically) that will run until the condition is satisfied.
3. Once the condition is satisfied, we can compute a result. 

The code pretty much writes itself when we follow this pattern.

**Implementation**
```python
def max_ones_3(nums, k):
	res = 0
	l = 0
	for r in range(len(nums)):
		if nums[r] == 0:
			k -= 1
		while k < 0: #condition violated
			if nums[l] == 0:
				k += 1
			l += 1
		#condition satisfied
		res = max(res, r - l + 1)
	return res
	
#time: o(n)
#memory: o(1)
```

**Mnemonic**
The problem is not hard, so instead this mnemonic will be for general [[conditional sliding window]]:

You are a bus driver. Your bus has an infinite number of seats, but there is a limit to how many clowns can be on the bus. If the bus is at maximum capacity of clowns and we must pick up another clown, the least recent clown is evicted from the bus plus everyone who got on before him because the bus has only one exit at the back and no room to maneuver.  

**Visual** 
![[IMG_80AC2D93B838-1.jpeg]]

**Review 1**
I instantly knew this was sliding window but for whatever reason I thought there was something more clever (may have confused a memory). After spending some time proving to myself that there is in fact nothing more clever, I coded the sliding window solution in a couple minutes.

#review 


