
**Link:** https://leetcode.com/problems/count-nice-pairs-in-an-array/
#### Solution:

**Topics**: [[hash map]], [[greedy]], [[math]], [[two sum]]

**Intuition**
If we isolate `i` and `j` terms in the definition of a nice pair...
```
nums[i] + rev(nums[j]) == nums[j] + rev(nums[i])

nums[i] - rev(nums[i]) == nums[j] - rev(nums[j])
```

We can see that a nice pair will have a common difference if each is subtracted by its reversal. Armed with this knowledge, we can turn this the problem into a has/need pattern with a hash map...similar to 2-sum. 

If a difference has been seen previously, a new pair can be formed by the current and every index that creates the difference...or just the count. Add the count to the result and increment it.

**Implementation**
```python
def nice_pairs(nums):
	res = 0
	diffs = {}
	for num in nums:
		diff = num - int(str(num)[::-1])
		if diff in diffs:
			res += diffs[diff]
		diffs[diff] = diffs.get(diff, 0) + 1
	return res
	
#time: o(n)
#memory: o(n) ...to store the hash map
```

**Visual** 
![[IMG_A65F54927A2C-1.jpeg]]

#review 

