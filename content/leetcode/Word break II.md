---
date: 2024-05-15
---
**Link:** https://leetcode.com/problems/word-break-ii/
#### Solution:

**DSA:** [[DFS]], [[subarray]], [[set]], [[grow]], [[shrink]]

**Intuition**
The key to understanding this problem is realizing that we can shrink `s`, and grow the current sentence. 

For example:
```python
word_dict = ['cat', 'cats', 'and', 'sand', 'dog']
s = 'catsanddog'
```

```
curr_s      |  s
---------------------
''             catsanddog
cats           anddog
cats and       dog
cats and dog   ''

```

So we can construct our recursion following the grow/shrink pattern. And when `len(s) == 0`, we have taken everything we can from it, which means `curr_s` is a valid sentence! 

In a recursive function, we would check all substrings of s starting at 0 if its a word in word_dict, if it is, then we shrink `s` and grow `curr_s`, and recursively call on those parameters. 

**Implementation**
```python
def word_break(s, word_dict):
	word_dict = set(word_dict)
	
	def dfs(s, curr_s):
		if len(s) == 0:
			return [curr_s[-1]] #remove the trailing space
			
		res = []
		for i in range(1, len(s)+1):
			potential_word = s[:i]
			if potential_word in word_dict:
				sentence = dfs(s[i:], curr_s + potential_word + ' ')
				res += sentence
		return res

	return dfs(s, '')
```

**Visual** 
![[IMG_F3C83AFF2D4A-1.jpeg]]
![[IMG_F2D49F0DF583-1.jpeg]]


#review 