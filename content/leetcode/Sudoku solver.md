---
date: 2024-08-27
---
**Link:** https://leetcode.com/problems/sudoku-solver/
#### Solution:

**Topics**: [[DFS]], [[back tracking]]

**Intuition**
This was a tough problem for me because I initially chose the wrong approach. I assumed that it would be possible to hard code some basic strategies and heuristics to solve the sudoku. This was not the case, and my hard-coded strategies failed. This approach may still be possible if I was not naive in the ways of sudoku strategies...but really I should have seen how bloated the code was getting and just pursued some sort of recursive search. 

It turns out that this problem is very approachable with a [[topological order]] search and a flavour of [[cycle detection]]. What does that mean? It simply means that we solve **one square at a time**, and treat subsequent squares as children that must be explored **before** the parent can be considered "visited". The square is considered "visited" in this context if at least one branch in its possibility tree is successful in reaching the final node (sudoku is solved). 

So the basic idea is to recursively try all valid moves for every empty square, and if we reach past the last node (the base case), we can return `True` because this means the sudoku is solved! The default return value should be `False` because some branches may have no valid moves, and thus the "dead-end" case must be handled. The topological ordering of the traversal is extremely useful here because we don't want to propagate or create new copies of the board state for each branch! The topological traversal allows us to modify `board` in-place. This is not too different from the [[N-queens]] approach. 

We must be mindful of the basic rules of sudoku to keep our sudoku valid. Columns, Rows, and 3x3 squares cannot contain duplicate values. 

**Implementation**
```python
def sudoku_solver(board):
	squares_pos = [[[] for _ in range(3)] for _ in range(3)]
	for row in range(9):
		for col in range(9):
			squares_pos[row // 3][col // 3].append((row, col))

	def is_valid(row, col, num):
		for i in range(9):
			if board[row][i] == num:
				return False
			if board[i][col] == num:
				return False

		for i, j in squares_pos[row // 3][col // 3]:
			if board[i][j] == num:
				return False
		return True


	def dfs(row, col):
		if row == 9:
			return True #sudoku solved
		if col == 9:
			return dfs(row+1, 0) #start new row
		if board[row][col] != '.':
			return dfs(row, col+1) #keep going for non-empty

		for i in range(1, 10):
			if is_valid(row, col, str(i)):
				board[row][col] = str(i)
				if dfs(row, col+1):
					return True
				board[row][col] = '.'
		return False #dead-end case
		
#time: o((9!)**9) See below...
#memory: o(n)
```

**Time complexity**
The time complexity is very interesting here. Brute force would just be `o(81**9)`, but this does not take constraints into account. The key is to look at the complexity of a single row!

The first position has 9 possibilities, the second has 8, the third has 7, the fourth has 6 and so on. Why? Because the each selection takes one possibility **away** from the next! Intuitively this makes sense because if we fill every 8 positions with a digit, then the 9th position has only one option! 

```
Possibilities if filling from the left:
[9, 8, 7, 6, 5, 4, 3, 2, 1]
```

Now, to count the arrangements of this pseudo-distribution we apply the product rule from combinatorics, which will simplify to `9!   (9*8*7...)` . This is the same rule we use to calculate the arrangements of a binary string using `2^n`, because if we enumerate the possibilities, the distribution would look like this: `[2,2,2,2,2....]`...thus the product rule simplifies in this case to `2^n`. 

If `9!` is the number of legal arrangements in a row, and we have 9 rows, the arrangement distribution is `[9!, 9!, 9!, 9!, 9!, 9!, 9!, 9!, 9!]`, and application of the product rule give us `(9!)^9`. 

Thus the time complexity is `o((9!)**9)`. 

**Mnemonic**
You are stuck on a sudoku puzzle, but you have no choice but to solve it. Unfortunately you are bad at sudoku, but fortunately time is of no consequence. Use trial and error. 

**Visual** 
![[IMG_B9D3240B85A7-1.jpeg]]

#review 
#hard 
#insane 


