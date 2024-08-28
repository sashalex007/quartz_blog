---
date: 2024-08-27
---
**Link:** https://leetcode.com/problems/sudoku-solver/
#### Solution:

**Topics**: [[DFS]], [[back tracking]]

**Intuition**
This was a tough problem for me because I initially chose the wrong approach. I assumed that it would be possible to hard code some basic strategies and heuristics to solve the sudoku. This was not the case, and my hard-coded strategies failed. This approach may still be possible if I was not naive in the ways of sudoku strategies...but really I should have seen how bloated the code was getting and just pursued some sort of recursive search. 

It turns out that this problem is very approachable with a [[topological order]] search and a flavour of [[cycle detection]]. What does that mean? It simply means that we solve **one square at a time**, and treat subsequent squares as children that must be explored **before** the parent can be considered "visited". The square is considered "visited" in this context if at least one branch in its possibility tree is successful in reaching the final node (sudoku is solved). 

So the basic idea is to recursively try all valid moves for every empty square, and if we reach past the last node (the base case), we can return `True` because this means the sudoku is solved! The default return value should be `False` because some branches may have no valid moves, and thus the "dead-end" case must me handled. The topological ordering of the traversal is extremely useful here because we don't want to propagate or create new copies of the board state for each branch! The topological traversal allows us to modify `board` in-place. This is not too different from the [[N-queens]] approach. 

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
		return False
		
#time:
#memory:
```

**Mnemonic**

**Visual** 

#review 


