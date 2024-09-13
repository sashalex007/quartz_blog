---
date: 2024-08-06
---
**Link:** https://leetcode.com/problems/koko-eating-bananas/
#### Solution:

**Topics**: [[binary search]]

**Intuition**
Pretty straight forward binary search problem. Probably the most difficult aspect is realizing that this is in fact a [[binary search]] solution. How? 

Basically, there is no more efficient way to check if Koko can eat all bananas than to iterate through the piles and simulate the eating and passing of time. The reason that there no better way is because each pile can have (or not have) a remainder...and according to the problem statement this remainder takes an entire hour to eat. So this property disallows doing anything more efficient like adding all piles together because doing this would make it impossible to account for all the remainders. The summation approach only works in the case that each pile is divisible by `k`. 

With that out of the way, [[binary search]] is all that remains to us. `k` will always be in the range of `1 to 10**9`...and we can divide and conquer that range. If we can finish in `h` hours or less, we can try reducing `k`. If we can't finish at all, we must increase `k`. 

**Implementation**
```python
def koko(piles, h):
	def can_finish(k):
		time = 0
		for pile in piles:
			time += ceil(pile / k)
			if time > h:
				return False
		return True

	l = 0
	r = res = 10**9
	while l <= r:
		mid = (l + r) // 2
		if can_finish(mid):
			r = mid - 1
			res = mid
		else:
			l = mid + 1
	return res

#time: o(mlogn)
#memory: o(1)
```

**Mnemonic**
Imagine piles of dirt in a line. We have to scoop these piles in a maximum of `h` hours, but we get paid less if we finish faster. The work must be done continuously, but the only thing we can change is the size of our shovel. Too small a shovel, and we wont finish in `h` hours, too big and we will get done too quickly. 

**Visual** 
![[IMG_05800BCE21D1-1.jpeg]]

#review 


