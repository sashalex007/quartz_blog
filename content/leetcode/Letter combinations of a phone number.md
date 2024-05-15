---
date: 2024-05-15
---
**Link:** https://leetcode.com/problems/letter-combinations-of-a-phone-number/
#### Solution:

**Topics**: [[back tracking]], [[DFS]], [[grow]]

**Intuition**
Build out the combinations recursively and append them to the result. May be tempting to use for loops but the code is more complicated for no real gain...just keep it simple. 

**Implementation**
```python
def letter_combinations(digits):
	if len(digits) == 0:
		return []
	mapping = {
		'2': 'abc',
		'3': 'def',
		'4': 'ghi',
		'5': 'jkl',
		'6': 'mno',
		'7': 'pqrs',
		'8': 'tuv',
		'9': 'wxyz'
	}
	res = []
	def dfs(i, s):
		if i == len(digits):
			res.append(s)
			return
		for char in mapping[digits[i]]:
			dfs(i+1, s+char)
	dfs(0, '')
	return res
			

#time: o(n(4**n)) 
#NOTE: because there are at most 4**n combinations and each of them takes n time to build

#memory: o(n) stack space
```

**Visual** 
![[IMG_CB7FCBE6762C-1.jpeg]]

#review 


