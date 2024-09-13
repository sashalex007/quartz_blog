---
date: 2024-05-15
---
**Link:** https://leetcode.com/problems/minimum-deletions-to-make-character-frequencies-unique/
#### Solution:

**Topics:** [[hash map]], [[sorted order]]

**Intuition**
The basic approach to this problem is understanding that a duplicate frequency must be decremented (or deleted) until we reach a frequency that has not been seen. 

For example:
```
s = aabbccccdddd
freq = {
	a:2,
	b:2,
	c:4,
	d:4
}

We can see that counts of 2 and 4 are repeated once, so they must be reduced. How can they be reduced?

Consider the set of seen frequencies: {2, 4}. Notice that there are two frequencies that are available...1 and 3. 

Optimally, the character 'c' or 'd' can be recuced to 3 and the character 'a' or 'b' can be reduced to 1. Observe that it would be far less optimal to reduce 'c' to 1, as that would result in spurious deletions. 

We should only reduce to zero (full deletion) if there are no available frequencies.

NOTE: The problem states that we can only delete, so while its also possible to make the frequencies unique by incrementing, this operation is forbidden. 

```


**Implementation**
```python
def min_deletions(s):
	freq = {}	
	for char in s:
		freq[char] = freq.get(char, 0) + 1
		
	counts = freq.values()
	seen = set()
	res = 0
	for count in counts:
		if count not in seen:
			seen.add(count)
		else:
			while count and count in seen:
				count -= 1
				res += 1
			if count:
				seen.add(count)
	return res

#time: o(n)
#memory: o(n)
```

**Visual** 
![[IMG_89BFE10859D4-1.jpeg]]



#review 





