---
date: 2024-08-28
---
**Link:** https://leetcode.com/problems/stone-game/
#### Solution:

**Topics**: [[DP]], [[game theory]]

**Intuition**
These "optimal play" problems will typically be DP...it's just a matter of setting up the recursion correctly...which is not an easy task at all. I eventually did find a solution but unfortunately it was not efficient enough to pass all the test cases. I missed a couple of key insights on my first attempt. 

Basically, we need to know 3 things to set up the recursion properly. 
1. the range of `piles` that we have to work with
2. whose turn it is
3. the score (or a representation of it)

1. The range of `piles` can simply be passed as `l, r`. 
2. This is hard to observe, but the player turn is actually implied with the range `l, r`. The array `piles` is guaranteed to be of even length, so it stands to reason that  if the length of the subarray in the range `l, r` is even, then it is Alice's turn. If odd, it is Bob's turn.
3. The score is way more manageable if we can represent it as one number. It just so happens that we can. Alice can add to the balance, and Bob can subtract from it. A victory for Alice would leave the balance positive, victory for bob- negative. 

Now we can set up our DP. The range of piles in propagated in `l, r` variables, the player turn is computed with provided `l, r`, and the score will be bubbled up in the return values, which makes the function cache-able.

**Implementation**
```python
def stone_game(piles):
	@cache
	def dfs(l, r):
		if l > r:
			return 0 #if no range, there are no more moves...return 0
			
		if (r - l + 1) % 2 == 0: #alice's turn
			take_left = piles[l] + dfs(l+1, r)
			take_right = piles[r] + dfs(l, r-1)
			return max(take_left, take_right) #take the max
			
		else:                     #bob's turn
			take_left = -piles[l] + dfs(l+1, r) #subtract selected pile
			take_right = -piles[r] + dfs(l, r-1)
			return min(take_left, take_right) #take the min, because that is
											#optimal for bob since he 
											#represents the negative side 

	return dfs(0, len(piles)-1) > 0

#time: o(n**2) because this is 2d DP
#memory: o(n**2) there are n**2 combinations of l, r
```

#review 


