---
date: 2024-07-24
---
**Link:** https://leetcode.com/problems/n-queens/
#### Solution:

**Topics**: [[DFS]]

**Intuition**
The challenge of this problem is more so the implementation versus the algorithmic difficulty (with one caveat). It should be immediately clear that this is a backtracking [[DFS]] problem. Why? Because the problem is asking for ALL solutions. 

The key insight is understanding that a queen prohibits positioning another queen on any of its rows, columns, or diagonals. We can enforce one queen per row by recursing one row at a time. The column of the queen must be added to a set, and so must the diagonals. Columns are simple, but how do we enforce the diagonals?

The diagonals are kind of tricky...we could of course iterate down the grid and add every position on the diagonal and anti-diagonal, but this would be extremely inefficient because there is a simple matrix trick:

```
diagonal = col - row
anti_diag = col + row

```

With that out of the way, its worth spending some time on understanding how the state will get propagated down the decision tree. Its clear that columns, diagonals and anti-diagonals will require their own set...but how do we propagate these sets? When I first solved this problem, I took the foolish approach of copying each set for each branch...the constraints are a joke for this problem so there was no runtime consequence except for the bloated code. However, this foolish approach slowed me down considerably- not because it was difficult to code but rather because it "felt" wrong so I wasted quite a bit of time thinking about how to compress the state into bits.

The right way is to treat the state the same way we do for cycle detection in a graph. We add the parent to 'visiting', visit all its children, and then remove it from visiting. There is no need for 'visited' because our graph for this problem is a tree (which is directed and acyclic). 

Building the result is kind of annoying...one way is to represent the board as a string of indices- for example `'1302'` for an `n=4` board, and then decode it into `[.Q.., ...]` format. Its technically better to do it that way because many branches wont make it to the end, so minimal memory usage would be desired. With python (IMO) its cleaner just to propagate the formatted result all the way down to the base case.

**Implementation**
```python
def n_queens(n):
	res = []
	def dfs(board, cols, diags, antis):
		row = len(board)-1
		if row == n-1:
			res.append(board)
			return

		for col in range(n):			
			if col not in cols and col-row not in diags and col+row not in antis:
				new_row = ''.join([('.' if i != col else 'Q') for i in range(n)])
				new_board = board + [new_row]
				cols.add(col)
				diags.add(col-row)
				antis.add(col+row)
				dfs(new_board, cols, diags, antis)
				cols.remove(col)
				diags.remove(col-row)
				antis.remove(col+row)
	dfs([], set(), set(), set())
	return res
	
#time: o(n!)
#memory: o(n*n)
```

**Mnemonic**
You are **visiting** prof Tzudner and he offers to play a special game of chess. The chess **set** is all queen pieces, so a **set** of queens. 

**Visual** 
![[IMG_2EC0B8F0C344-1.jpeg]]

**Review 1**
Spent a bit of time figuring out the best way to implement this. Ultimately, I think I was wrong in the above approach. Its better to keep the states outside of the recursion and then convert the board rows into strings when we hit the base case. I think this is more efficient, cleaner, and simpler than building the pre-formatted result inside the call stack. Fun problem though, don't forget about the diagonals and anti-diagonals!

#review 


