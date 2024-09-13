---
date: 2024-09-03
---
**Link:** https://leetcode.com/problems/3sum-closest/
#### Solution:

**Topics**: [[3sum]], [[Two sum II]]

**Intuition**
This is a very nice variation on the classic [[3sum]] problem. The worst case for this class of problems is to iterate over all possible triplets of indices, which is `o(n**3)` complexity, so the best we can hope for is `o(n**2)`. 

The basic idea is the same as [[3sum]]. We keep one index fixed and use a [[two pointer]] technique on the remaining partition to approach the target. The slight twist in this problem is that the array may or may not actually contain the target, so our task is to simply to return the closest value. 

We can evaluate  "closeness" with the absolute difference. When a smaller absolute difference is found, we can update the difference. Its important to note that we keep the difference signed, but evaluate it in absolute terms. This is crucial because we will use this difference to reconstruct the original closest value by adding it to the target.

For example:
```
target = 50
closest = 49
diff = -1

res = target + diff

#diff must be signed otherwise we would not be able to reconstruct the original value. 
```

**Implementation**
```python
def 3sum_closest(nums, target):
	nums.sort()
	diff = float('inf')
	for i in range(len(nums)-2):
		l = i + 1
		r = len(nums)-1
		while l < r:
			total = nums[i] + nums[l] + nums[r]
			diff = min(diff, total-target, key=lambda x: abs(x))
			if total == target:
				return total
			elif total < target:
				l += 1
			else:
				r -= 1				
	return target + diff

#time: o(n**2)
#memory: o(1)
```

**Visual** 
![[IMG_F8C3BA0D4E6C-1.jpeg]]


#review 


