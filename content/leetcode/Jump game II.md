---
date: 2024-11-09
---
**Link:** https://leetcode.com/problems/jump-game-ii/
#### Solution:

**Topics**: [[greedy]], [[Jump game]], [[stack]]

**Intuition**
Super fun problem, I really enjoyed solving this one! I found a super nice stack solution but there is an `o(1)` memory solution as well. Ill go over the stack solution because I think it's really creative. 

What makes this problem interesting is that unlike [[Jump game]], there is a guaranteed path to the last index, and our task is to find the minimum amount of jumps. The key idea for the stack solution is to pop indices off the stack that can be skipped over by the current index. How?

Starting from the end of the array, we append indices to the stack if the current element **can reach** the index at `stack[-1]`. Also, while `stack[-2]` is also reachable, we pop off the stack! At the end of the algorithm, `len(stack)-1` is the result because it will hold the exact minimum length subsequence of jumps to reach the end! We decrement by 1 because the first element added is `n-1` which does not count towards jumps as it is the final destination. 

**Implementation (stack)**
```python
def jump_game2(nums):
	stack = [len(nums)-1]
	for i in range(len(nums)-2, -1, -1):
		while len(stack) > 1 and nums[i] + i >= stack[-2]:
			stack.pop()
		if nums[i] + i >= stack[-1]:
			stack.append(i)
	return len(stack)-1

#time: o(n)
#memory: o(n)
```

I really like this solution but it's a bit overkill for this problem. In the worst case it's `o(n)` if `nums` is all 1's. This solution also would solve the slightly harder version of this problem, which is if we remove the guarantee that the end can be reached with `len(stack) == 1`!  But since, we are given this guarantee, it can be leveraged towards an `o(1)` memory solution. How?

Since we are guaranteed to reach the last index, we can keep two variables: `furthest_reachable` and `current_end`. The former is the maximum position reachable from the current index and `current_end` is the currently end point of the previous jump. If we reach the current end point, it means we need another jump at this position so we increment the result and set `current_end` to `furthest_reachable`!  Note that this is pretty unintuitive and **only** works if we have a guarantee that the end is reachable. 

**Implementation (greedy)**
```python
def jump_game2(nums):
	res = 0
	curr_far = 0
	curr_end = 0
	for i, num in enumerate(nums[:-1]): #stop before the last index!
		curr_far = max(curr_far, i + num)
		if i == curr_end:
			res += 1
			curr_end = curr_far
	return res
```

This solution is a bit of a mind bender...I still much prefer the stack solution...it's both generic and draws from the [[Jump game]] solution. 

**Review 1**
Pretty difficult problem! I found both the top-down and bottom-up DP solutions quite fast...considered stack for a moment but jumped straight into greedy and could not get out of the weeds. The stack solution is so elegant! The pure greedy `o(1) memory` solution is somewhat of a mind bender, but it does make sense. 

#review 
#hard 


