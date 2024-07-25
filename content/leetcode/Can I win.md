---
date: 2024-07-25
---
**Link:** https://leetcode.com/problems/can-i-win/
#### Solution:

**Topics**: [[DP]]

**Intuition**
This is legitimately a very difficult problem. It seems easy but its absolutely riddled with edge-cases. There is only one implementation (to my knowledge) that can pass all the cases and it is not obvious to me how that implementation is different from others that I have tried. Its still not entirely clear to me what "playing optimally" actually means in this context but I'll do my best to explain. 

So lets start by trying to understand what "playing optimally" means for this problem. To my understanding playing optimally just means **not losing on purpose**...or if its possible to win with a move, we always take that move. If its not possible to win, then there is no "optimal" move, so we are forced to try all moves available. So "forcing a win" just means if there exists a sequence of moves that you can play where at no point does your opponent have a winning move available to them. 

I initially misinterpreted this problem to mean: "is there a first move you can select that makes it impossible for you to lose". This seems like a reasonable interpretation but its not congruent with "optimal play" because there are many ways to lose on purpose!

Lets start by formally defining what the "optimal move" is. The optimal move is simply the move that wins. And the move that is most likely to win would be the largest move available to you! But what if the largest move does not win? Is it still the optimal move? No! If that were the case, we could solve this problem with a max heap. The optimal move could in fact be the smallest move because that might tip the balance into a winning sequence....the point is, we **don't know what is optimal**, we only know that that the optimal move **wins**. 

So essentially, our base-case should built around the definition of the optimal move: 

```python
if total + max_move >= desiredTotal:
	return True #this is a win
```

Now lets decide how we keep track of our pool of moves. Each move taken cannot be used again, so we must keep track of this pool of moves. Initially my solution was to use a set and remove/add moves from the set like in graph cycle detection. While this does technically work, there are some problems with it. Firstly getting the max_move is inefficient, and most importantly,  sets are not hash-able for DP....but why is that an issue? Could we not just keep the set outside the function, remove/add moves like in cycle detection, and have only `total` as a hash-able integer parameter for our DP function? NO! Why not?

While my suggested approach appears clever, it has a fatal and very subtle flaw. If we keep only `total` as a parameter, then caching the function will cause errant results. Why? Because we can have **the same total, but a different set of available moves!!!** What this means is that for the same total, we could have different results...but if we cache the first returned value for a given `total`, all the other branches for `total` (with different moves available) remain **unexplored!** The moral here, is that if we want to have `total` as the single dimension of our search space, then we cannot cache. And if we cannot cache, we get TLE. 

So what is the remedy here? The solution is to include `moves_available` as a function parameter. But how? Lists and sets are mutable and thus cannot be hashed...so how does this help? **Tuple** to the rescue! We can keep a list of moves available as a tuple, which is a hash-able type...and the side benefit is that the tuple will be in increasing order so the optimal move can be found in o(1) time. 

**Implementation**
```python
def can_win(maxChoosableInteger, desiredTotal)
	moves = tuple([i for i in range(1, maxChoosableInteger+1)])
	if sum(moves) < desiredTotal:
		return False

	@cache
	def dfs(moves, total):
		if moves[-1] + total >= desiredTotal:
			return True

		for i in range(len(moves)):
			other_player_result = dfs(moves[:i]+moves[i+1:], total+moves[i])
			if not other_player_result: #other player lost
				return True
		return False 

	return dfs(moves, 0)

#time: o(n**3) n = maxchoosableInteger
#memory: o(n**3) 
```

**Mnemonic**
Imagine catching a Tupperware container. Inside the container is a list of distances you are allowed to throw it. Choose a distance out of of the container and throw it out. If  you throw it past a certain distance, you win. (caching a tuple to win). 

**Visual** 
![[IMG_613DA0D94301-1.jpeg]]

#review 


