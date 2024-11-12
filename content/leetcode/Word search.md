---
date: 2024-11-12
---
**Link:** https://leetcode.com/problems/word-search/
#### Solution:

**Topics**: [[Word search II]], [[topological order]], [[DFS]]

**Intuition**
Cute little problem. Crushed it in about 3 minutes. [[Word search II]] is way more interesting. Time complexity is a bit weird. I was initially thinking about it in terms of if the length of the word was greater than the number of elements in the board...in that case complexity is `o((n*m)*(n*m))`. But the constraints tell us that the length of the word is always smaller than the number of elements. 

Basically in the DFS, for the first letter we branch off in 4 directions, and the depth of each direction is potentially `len(word)`, so the complexity should be `o((m*n)*(4**len(word)))`? Almost. In fact we only branch off in 4 directions for the first letter. All subsequent letters only branch in 3 directions because they cannot cross over their own path! So the complexity of each recursion is `3**len(word)`. 

**Implementation**
```python
def word_search(board, word):
	self.i = 0
	def dfs(row, col):
		if self.i == len(word):
			return True
		if row == -1 or row == len(board) or col == -1 or col == len(board[0]):
			return False
		if board[row][col] != word[self.i]:
			return False

		letter = board[row][col]
		board[row][col] = '#'
		self.i += 1
		for i, j in ((1,0),(-1,0),(0,1),(0,-1)):
			if dfs(i+col, j+row):
				return True
		board[row][col] = letter
		self.i -= 1
		return False

	for col in range(len(board)):
		for row in range(len(board[0])):
			if dfs(row, col):
				return True
	return False

#time: o((m*n)*(3**len(word)))
#memory: o(m*n)
```

#review 


