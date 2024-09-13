---
date: 2024-08-29
---
**Link:** https://leetcode.com/problems/stone-game-ii
#### Solution:

**Topics**: [[DP]], [[game theory]], [[Stone game]]

**Intuition**
This problem builds on [[Stone game]], but I think the difficulty is greatly increased. These "optimal play" patterns are not the most intuitive for me but I'll do my best. The problem statement is also not very clear in my opinion.

Lets start by establishing what "optimal play" means in this context. Optimal play simply means, not choosing a move that guarantees a loss (**even if that loss occurs sometime in the future**)...unless all remaining options will lose. How do we know which move does not guarantee a loss? We don't, so we must try all the moves available to us (the subproblems are overlapping, so there is room for optimization). 

With that established, lets get into the algorithm. If both players must play optimally, then by definition, the decision making should be the same for both. In the context of a recursive DP function, this means that the turns are swapped. This was very easy to do implicitly in [[Stone game]], but this problem is quite a bit different so for simplicity we will pass player turn into our recursive function with a toggle variable. 

The other thing we must handle is score. Since keeping both player scores is computationally intensive (and not very optimizable), we will keep track of score as a single quantity. Player 1 adds to the quantity, and player 2 subtracts. At the end we convert this quantity into a score with the operation `(sum(piles) + quantity) // 2`. This works because the quantity is essentially how many stones more or less you have collected compared to your opponent, and since at the end of the algorithm all stones have been collected by both players, we can derive the formula as follows:

```
1. total = your_score + opponent_score
2. opponent_score = total - your_score

3. quantity = your_score - opponent_score
4. your_score = opponent_score + quantity


Now plug formula 2 into formula 4:

1. your_score = total - your_score + quantity
2. 2*(your_score) = total + quantity
3. your_score = (total + quantity) / 2

Formula 3 now just becomes sum(piles) + quantity // 2
```

The last step to handle `m`. Simply compute `x`, to take from `1` to `x` piles, and each time pass `max(m, piles_you_took)` into the recursive function. 

**Implementation**
```python
def stone_game2(piles):
	@cache
	def dfs(i, m, player):
		if i == len(piles):
			return 0
			
		max_piles = m*2
		_max = float('-inf') if player == 0 else float('inf')
		take = 0
		for p in range(i, min(i + max_piles, len(piles))):
			take += piles[p]
			taken = p - i + 1
			if player == 0:
				_max = max(_max ,take + dfs(p+1, max(m, taken), player+1))
			else:
				_max = min(_max ,-take + dfs(p+1, max(m, taken), player-1))
		return _max
		
	return (dfs(0, 1, 0) + sum(piles)) // 2
				
#time: o(n*m*m) note that im not counting player variable here.
#memory: o(n*m) 
```

#review 


