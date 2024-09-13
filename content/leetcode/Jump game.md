---
date: 2024-08-20
---
**Link:** https://leetcode.com/problems/jump-game/
#### Solution:

**Topics**: [[greedy]], [[DFS]]

**Intuition**
This can be solved with a simple DFS, but at best it will be `o(n*n)` because of the high branching factor (every position `i` has a range of possible positions from `i+1 to i+nums[i]`. Without caching, it's `o(n*n*n)`. BFS is even worse because we can't early exit. 

The DFS solution passes all test cases, however there is a greedy solution that is `o(n)`. This one is pretty tricky to come up with. The key idea is to start from the back, and see if we can reach the **minimum necessary position**. What does this mean?

Very simple, if the second last index can reach the last index, then we now should only care about reaching the second last index because if we can reach it, then by default, we can reach the last index!

For example:
```
* = where we must reach
^ = current pointer

[4,0,0,0,1,4]
		 ^ *    We see that the ^ pointer can reach * because
				the distance to * is less than or equal to the
				max allowable jumps! (1)
		 
[4,0,0,0,1,4]
	   ^ *      Cannot reach
	   
[4,0,0,0,1,4]
	 ^   *      Cannot reach

[4,0,0,0,1,4]
   ^     *      Cannot reach

[4,0,0,0,1,4]
 ^       *      Can reach!
 
 [4,0,0,0,1,4] 
^ *

The algorithm ends with * = 0, so the last index is reachabe from the first!

```

**Implementation**
```python
def jump_game(nums):
	must_reach = len(nums)-1
	for i in range(len(nums)-2, -1, -1):
		distance_to = must_reach - i
		if nums[i] >= distance_to:
			must_reach = i
	return must_reach == 0

#time: o(n)
#memory: o(1)
```
 
#review 


