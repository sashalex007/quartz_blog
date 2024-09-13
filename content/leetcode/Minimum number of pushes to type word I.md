---
date: 2024-05-27
---
**Link:** https://leetcode.com/problems/minimum-number-of-pushes-to-type-word-i/
#### Solution:

**Topics**: [[math]]

**Intuition**
Not a very difficult problem but reading the problem statement at 5am, I had missed that all characters in `word` are distinct. So I effectively solved the slightly harder version of this problem which involves a frequency map and sorting. 

Of course this is not necessary here as the number of presses is a direct function of of the length of the word, as the frequency of each character is guaranteed to be exactly one. The o(1) math solution is more interesting but I'll show the iterative approach first.

**Implementation (iterative)**
```python
def min_pushes(word):
	res = 0
	for i in range(len(word)):
		res += (i // 8) + 1
	return res
	
#time: o(n)
#memory: o(1)
```

**Implementation (mathematical)**
```python
def min_pushes(word):
	if len(word) <= 8:
		return len(word)
	res = 0
	counts = [8, 24, 48] #number of presses per row of whole 8
	rows = len(word) // 8
	res += counts[rows-1]
	remaining = len(word) % (rows*8) #get remaining
	res += remaining * (rows + 1) #multiply by the press factor
	return res
	
#time: o(1)
#memory: o(1)
```

**Visual** 
![[IMG_353DD9024FAC-1.jpeg]]

#review 


