---
date: 2024-05-22
---
**Link:** https://leetcode.com/problems/custom-sort-string/
#### Solution:

**Topics**: [[hash map]]

**Intuition**
Nice little problem utilizing a bucket sort with the aid of a hashmap. Basically we must convert the string `s` into a frequency map and then iterate through `order` to build up our sorted string. 

The notable edge case here is that there may be characters in `s` that don't appear in `order`. These characters have an ambiguous order, so we can add them in any order at the end of our sorted string. 

Instead of a frequency map storing a count, for this problem I prefer storing the characters because it makes the implementation a bit more time efficient. 

**Implementation**
```python
def custom_sort(order, s):
	freq_map = {}
	for char in s:
		freq_map[char] = freq_map.get(char, '') + char
		
	sorted_s = ''
	for char in order:
		if char in freq_map:
			sorted_s += freq_map[char]
			freq_map[char] = ''
			
	for remaining in freq_map.values():
		sorted_s += remaining
	return sorted_s
			

#time: o(n)
#memory: o(n)
```

**Visual** 

![[IMG_42AFEE97BD3A-1.jpeg]]


#review 


