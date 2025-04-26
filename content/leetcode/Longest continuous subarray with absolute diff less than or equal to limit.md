---
date: "2025-04-26"
---
**Link:** https://leetcode.com/problems/longest-continuous-subarray-with-absolute-diff-less-than-or-equal-to-limit/
#### Solution:

**Topics**: [[Sliding window maximum]], [[monotonic stack]]

**Intuition**
Very tricky problem! I solved this with [[SortedList]] very quickly but this is nlogn worst case which is good enough to pass all the cases but the linear solution is more subtle. It's very similar to [[Sliding window maximum]], but for this one we are concerned with the minimum integer in the window and the maximum integer in the window because the limit for the window is `max-min`. 

So we essentially require an efficient way to keep track of the `min` and `max` in a sliding window. This is why I initially used [[SortedList]] (heap also possible but more complicated), but there is a more clever and optimal way. 

The key insight is that once we have seen a number in our window that is either the min or the max, we no longer need to consider all other previously seen mins or maxes. 

For example (in the case of max):
```
[1,2,3]
 ^ window = [1], max = 1
   ^ window = [1, 2] max = 2 ...notice that 1 can no longer be considered!
     ^ window = [1, 2, 3] max = 3 ...now 2 can no longer be considered
```

But lets look at another case:
```
[3,2,1]
^ window = [3], max = 3
   ^ window = [3,2], max = 3 
	 can 2 no longer be considered as a potential max? NO! Why?
	 Because if we shrink the window at some point then 2 could be the
	 NEW MAX! 
```

Basically whenever we shrink or grow the window, we need an efficient way to get the new min and max, because it's possible that by shrinking the window we have just **discarded the old min or max**, or by growing the window we have just **encountered a new min or max**. 

The answer is [[monotonic stack]]. We keep an increasing stack such that `inc_stack[0]` is always the minimum and a decreasing stack such that `dec_stack[0]` is always the maximum! One property of monotonic stacks is that they will discard all elements that *no longer need be considered* (like in example 1), and *keep all elements that should be considered in the future*. 

While `nums[dec_stack[0]] - nums[inc_stack[0]] > limit`, we shrink the window until the left pointer reaches either `dec_stack[0]` or `inc_stack[0]`. This way we can discard offending integers while keeping an accurate window size. 

Initially I solved this by pushing the values to the stacks, but I think it's more canonical and generalizable to push the indices. 

**Implementation**
```python
def longest_sub(nums, limit):
	res = 0
	inc_stack = deque()
	dec_stack = deque()
	
	l = 0
	for r in range(len(nums)):
		while inc_stack and nums[inc_stack[-1]] > nums[r]:
			inc_stack.pop()
		inc_stack.append(r)
		
		while dec_stack and nums[dec_stack[-1]] < nums[r]:
			dec_stack.pop()
		dec_stack.append(r)

		while nums[dec_stack[0]] - nums[inc_stack[0]] > limit:
			if dec_stack[0] == l:
				dec_stack.popleft()
			if inc_stack[0] == l:
				inc_stack.popleft()
			l += 1				
		res = max(res, r - l + 1)
		
	return res
	
#time: o(n)
#memory: o(n)
```

Tagging this hard because I didn't come up with optimal solution in less than 10 minutes. 

#hard 
#review 


