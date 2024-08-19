---
date: 2024-08-19
---
**Link:** https://leetcode.com/problems/reorganize-string/
#### Solution:

**Topics**: [[heap]]

**Intuition**
This is a very classic heap problem. The key idea is to convert the string into a frequency map and then push the frequencies onto the heap as a tuple of `(count, char)`. From there, simply pop off the two most frequent elements until no elements remain. 

**Implementation**
```python
def reorg_string(s):
	freq = {}
	for char in s:
		freq[char] = freq.get(char, 0) + 1
	max_heap = [(-count, char) for char, count in freq.items()]
	heapify(max_heap)

	res = ''
	while len(max_heap) > 1:
		first_count, first_char = heappop(max_heap)
		sec_count, sec_char = heappop(max_heap)
		res += first_char + sec_char
		if first_count < -1:
			heappush(max_heap, (first_count+1, first_char))
		if sec_count < -1:
			heappush(max_heap, (sec_count+1, sec_char))
			
	if len(max_heap) == 1:
		count, char = heappop(max_heap)
		if count != -1:
			return ''
		res += char
	return res
	
#time: o(nlogk)
#memory: o(k)
```


#review 


