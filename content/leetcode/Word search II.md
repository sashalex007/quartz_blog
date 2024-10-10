---
date: 2024-05-15
---
**Link:** https://leetcode.com/problems/word-search-ii
#### Solution:

**Topics**: [[DFS]], [[trie]]

**Intuition**
This is a really good graph problem. The key here is to use a trie to traverse every valid path (word) in the board starting at every position. We do this because if the letter at a certain position is not in the top level of the trie then it cannot be a word (no word starts with that letter). We can use this logic recursively to make this decision at every level of our trie. If the path is valid, and the trie at that level contains the word delimiter then that word can be added to `found_words`.

Once a word has been found, we don't need to find it again so we can prune the word delimiter from our trie. Furthermore, if the trie at that level is empty, we can prune it further to prevent redundant searches. 

The other consideration for the traversal is that we must mark nodes in the path as being visited such that no letter is used more than once (and to prevent stack overflow in certain cases).

**Implementation**
```python
def word_search_ii(board, words):
	found_words = []
	trie = {}
	for word in words:
		curr = trie
		for char in word:
			if char not in curr:
				curr[char] = {}
			curr = curr[char]
		curr['#'] = word

	def dfs(row, col, trie):
		if row == -1 or row == len(board):
			return
		if col == -1 or col == len(board[0]):
			return
		char = board[row][col]
		if char not in trie or char == '*':
			return
		board[row][col] = '*'

		if '#' in trie[char]:
			found_words.append(trie[char]['#'])
			del trie[char]['#']
			
		if len(trie[char]) == 0:
			del trie[char]
		else:
			delta = [(1, 0),(0, 1),(-1, 0),(0, -1)]
			for i, j in delta:
				dfs(row+i, col+j, trie[char])
		board[row][col] = char

	for row in range(len(board)):
		for col in range(len(board[0])):
			dfs(row, col, trie)
	return found_words

#time: o(n*m*len(longest_word))
#memory: o(m*n) or o(nubmer_of_chars)
```


**Visual** 

![[IMG_51488C1A2018-1.jpeg]]

**Review 1**
Great problem! It was very easy this time around. Don't forget to put the word itself in the trie under the `#` key. Use a [[back tracking]] strategy to avoid cycles. Also, don't forget to pop off the `#` delimiter once a word has been found; this is so that we don't look for this word again (you can imagine a board of all `a` searching for `aaa...`. ,finding it once is enough).  

Also don't forget to pop off `trie[char]` if the hash-map is empty....otherwise there is no effect to popping the delimiter. 

#review 
#hard 

