---
date: 2024-05-17
---
**Link:** https://leetcode.com/problems/edit-distance/
#### Solution:

**Topics**: [[DP]]

**Intuition**
For me, this was a tricky problem to reason about because initially my mind jumped to [[BFS]]. BFS seems to fit on first glance because "edit distance" could be interpreted as the shortest path between `word1` and `word2`. Upon deeper analysis, I decided that it was not a BFS problem. Why not?

BFS is not suitable here because you get combinatorial explosion:

```
word1 = 'bob'
word2 = 'joe'

for every character in word1, we would have to delete, insert, replace, or leave. 

#delete every possible char in bob
[ob, bb, bo]

#replace every possible char in bob with every possible char in joe
[job, oob, eob, bjb, bob, beb, boj, boo, boe]

#insert every posible char in joe into every possible position in bob
[jbob, bjob, bojb, bobj, obob, boob, boob, bobo, ebob, beob, boeb, bobe]

So in a BFS with 'bob' as the starting node, we have to create 24 new branches (some can be pruned but not many). This is an exponentially increasing number of nodes at every level so this algorithm is not feasable. 

In the "word ladder" problem, the words are the same length and most transformations are not in the dictionary so practially speaking this keeps the branching factor quite low. 
```

With BFS, ruled out that leaves only DP because It's still a combinatorics problem and there will be many redundant branches so caching is required.

The DP strategy maps onto the classic take/skip pattern but instead of take/skip, we transform it to insert/delete/replace/leave. We need extra logic to handle the "leave" branch because if we can leave a letter ( `if word1[i] == word2[j]` ) , then we do it opportunistically and prune the other branches. Why?

For example:

```
word1 = hhorse
word2 = horse

If we leave the first h as-is without branching off into replace/delete/insert, how would we get to the correct result because clearly the optimal path is deleting the first h!

Actually the optimal path could also be deleting the second h, so our branches are still complete!
```


The code writes itself...other than some tricky base case conditions (but they make sense if you stop and think about it). 

**Implementation**
```python
def edit_distance(word1, word2):
	@cache
	def dfs(i, j):
		if i == len(word1):
			return len(word2) - j #insert remaining letters in word2
		if j == len(word2):
			return len(word1) - i #delete remaining letters in word1

		if word1[i] == word2[j]: #always keep if equal
			return dfs(i+1, j+1) 
		else:
			insert = 1 + dfs(i, j+1)
			delete = 1 + dfs(i+1, j)
			replace = 1 + dfs(i+1, j+1)
			return min(insert, delete, replace)

	return dfs(0, 0)

#time: o(len(word1)*len(word2))
#memory: o(len(word1)*len(word2))
```

**Visual** 

![[IMG_2ACFDEF016A3-1.jpeg]]


#review 


