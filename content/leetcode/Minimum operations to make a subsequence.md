---
date: "2025-05-17"
---
**Link:** https://leetcode.com/problems/minimum-operations-to-make-a-subsequence/
#### Solution:

**Topics**: [[binary search]], [[Longest increasing subsequence]]

**Intuition**

This is a fantastic problem. I initially solved it with recursive [[DP]] but that is of course `n*n` time complexity and I got TLE. Then I went back and learned [[Longest increasing subsequence]] properly and solved it correctly.

Basically if you know LIS, this problem becomes somewhat straightforward, although it requires some out of the box thinking. We can treat each character in `target` as simply the value of its own index and REPLACE each number in `arr` with it's index value from `target`! Then the problem just becomes LIS! This is quite tricky to come up with but it does make sense. 

**Implementation**
```python
def minops(target, arr):
	ind = {num:i for i, num in enumerate(target)}
	sub = []
	for num in arr:
		if num not in ind:
			continue
		i = bisect_left(sub, ind[num])
		if i == len(sub):
			sub.append(ind[num])
		else:
			sub[i] = ind[num]
	return len(target) - len(sub)
		

#time:
#memory:
```

#hard
#review 


