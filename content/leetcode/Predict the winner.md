---
date: 2024-09-16
---
**Link:** https://leetcode.com/problems/predict-the-winner/
#### Solution:

**Topics**: [[DP]], [[Stone game]]

**Intuition**
This is essentially the same problem as [[Stone game]]. I was pleased to have solved this easily given how much I struggled in the past on these "optimal play" DP patterns. 

Since this is basically the same problem as [[Stone game]], Ill just show my first solution and then how I optimized it...and why the two lead to the same result. 

**Implementation (player variable)**
```python
def predict(nums):
	@cache
	def dfs(l, r, player):
		if l > r:
			return 0
			
		if player == 1:
			left = nums[l] + dfs(l+1, r, 2)
			right = nums[r] + dfs(l, r-1, 2)
			return max(left, right)
		else:
			left = -nums[l] + dfs(l+1, r, 2)
			right = -nums[r] + dfs(l, r-1, 2)
			return min(left, right)

	return dfs(0, len(nums)-1, 1) > -1

#time: o(n*n)
#memory: o(2*n*n) times two because every score can be for player 1 or 2. 
```


The above solution works fine, but it is not the most clever way to do it. In the above, I am manually propagating `player` variable to keep track of who's turn it is and then using some switching logic to control the arithmetic. 

What can be done instead is to control this process through **arithmetic alone**. This requires a deeper faith in top-down recursion... but the reward is some damn clean code. 

**Implementation (faith in recursion)**
```python
def predict(nums):
	@cache
	def dfs(l, r):
		if l > r:
			return 0
		left = nums[l] - dfs(l+1, r)
		right = nums[r] - dfs(l, r-1)
		return max(left, right)
	return dfs(0, len(nums)-1) > -1

#left = nums[l] - dfs(l+1, r)
#       ^         ^
#    my move     opponents move

#as we propagate through the call stack, this relationship auto-reverses. 
#the current player's move gets canceled out by the next player's move. 
#the returned value is a `balance`, rather than score for each player

#time: o(n*n)
#memory: o(n*n)
```

#review 


