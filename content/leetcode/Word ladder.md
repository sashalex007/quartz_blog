---
date: 2024-08-19
---
**Link:** https://leetcode.com/problems/word-ladder/
#### Solution:

**Topics**: [[BFS]]

**Intuition**
Really great [[BFS]] problem. Classic shortest path pattern. Basically, to move to another word in the possible sequence, the word must be both valid and 1 letter different from the previous word (parent). 

We choose [[BFS]] here because the branching factor can be quite high (many children per parent), and only one branch will lead to the correct sequence. In other words, it does not make sense to fully explore every possible sequence of each branch. Most of those branches will not be fruitful, so its far more efficient to explore all branches at once, in level-by-level order...and by default, we also get the shortest path. 

High branching factor:

![[Screenshot 2024-08-19 at 3.59.09 PM.png]]

Not all transformations will be valid, so the branching factor is not so extreme...however we cannot rely on this. 

**Implementation**
```python
def word_ladder(beginWord, endWord, wordList):
	alph = 'abcdefghijklmnopqrstuvwxyz'
	wordList = set(wordList)
	visited = set()
	queue = deque([(beginWord, 1)])
	while queue:
		word, level = queue.popleft()	
		if word in visited:
			continue
		if word == endWord:
			return level
		visited.add(word)
		for char in alph:
			for i in range(len(word)):
				new_word = word[:i] + char + word[i+1:]
				if new_word in wordList and new_word not in visited:
					queue.append((new_word, level + 1))
	return 0
	
#time: o((n**2)*m) 
#memory: o((n**2)*m)
```


#review 


