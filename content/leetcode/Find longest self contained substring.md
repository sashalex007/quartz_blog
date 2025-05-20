---
date: "2025-05-20"
---
**Link:** https://leetcode.com/problems/find-longest-self-contained-substring
#### Solution:

**Topics**: [[first, last occurrence]], [[Partition Labels]]

**Intuition**
This type of problem where we are looking for mutually exclusive partitions usually follows the [[first, last occurrence]] pattern. 

There is a very important insight that is true of ANY mutually exclusive substring. A mutually exclusive substring will ALWAYS start at the **first occurrence** of a character! But also, the last character in any mutually exclusive substring will be the **last occurrence** of the character!

For example:
```
s = 'abba'
exclusive = 'bb'
             ^ first occurrence of b

s = 'abacd'
exclusive = 'abac'
			 ^ first occurrence of a       

```

So why is this important? What this means is that there are **at most** 26 possible starting points for the longest self-contained (mutually exclusive) substring! 

With that in mind, it should then be viable to iterate over all possible starting points and compute the longest valid self contained substring from that start...at a cost of only `o(26*n)`! 

However, there is a final observation that must be made before we can solve this problem. If we are computing the longest self-contained substring at a particular starting index `i`... then every character in the self-contained substring **must** have a first occurrence `j` where `i < j`! 

Why? Well it should be obvious but lets look at an example:
```
s = 'abcda'

abcda
  * possible starting point, contained = c
abcda  
  ** still valid, contained = cd
abcda  
  *** 'cda' is not valid because a has an occurrence point BEFORE c ! 
    
```

**Implementation**
```python
def longest_self_contained(s):
	first = {}
	last = {}
	for i, char in enumerate(s):
		if char not in first:
			first[char] = i
		last[char] = i

	res = -1
	for char in first.keys():
		start = first[char]
		potential_end = last[char]
		for i in range(start, len(s)):
			next_char = s[i]
			if first[next_char] < start: #invalid
				break
				
			potential_end = max(potential_end, last[next_char])#get the furthest
			if i == potential_end: #current char is last occurrence! 
				end = potential_end
				if end-start+1 < len(s):
					res = max(res, end-start+1)
	return res
			

#time: o(26*n) -> o(n)
#memory: o(26) -> o(1)
```

#review 
#hard 
#insane 

