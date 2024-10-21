---
date: 2024-07-17
---
**Link:** https://leetcode.com/problems/difference-between-ones-and-zeros-in-row-and-column/
#### Solution:

**Topics**: [[math]]

**Intuition**
Fairly simple problem, but maybe not instantly apparent how to solve while using the minimum amount of memory or the fewest iterations (not that it makes much difference here). The idea is to initialize two lists of length `m` for rows and length `n` for columns. Iterate through the matrix and increment the sums in the corresponding lists. We don't need a count of zeros because to get the zeros we just subtract the total from n or m (because thats the upper bound). 

Iterate over the matrix again and replace each element with the computed value. 

**Implementation**
```python
def diff_mat(grid):
	m = len(grid)
	n = len(grid[0])
	rows = [0] * m
	cols = [0] * n
	for row in range(m):
		for col in range(n):
			rows[row] += grid[row][col]
			cols[col] += grid[row][col]

	for row in range(m):
		for col in range(n):
			grid[row][col] = rows[row]+cols[col]-(m-rows[row])-(n-cols[col])
	return grid
	
#time: o(m*n)
#memory: o(m+n)
```

**Mnemonic**
We have `m` types of trees and `n` heights of trees. We want to know how many trees of `n` type there are and also how many trees of `m` height there are. For this we need two lists. 

**Visual** 
![[IMG_AFFDB98DFDF3-1.jpeg]]

**Review 1**
Too easy. Remember that `num_zeros = n - num_ones`. 

#review 


