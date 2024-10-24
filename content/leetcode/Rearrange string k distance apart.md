---
date: 2024-08-19
---
**Link:** https://leetcode.com/problems/rearrange-string-k-distance-apart/
#### Solution:

**Topics**: [[heap]]

**Intuition**
Pretty much the same problem as [[Reorganize string]], but we pop `k` elements off the heap instead of just two for adjacent alterations. 

**Implementation**
```python
def rearrange(s)
	if k < 2:
		return s
	
	res = ''
	freq = {}
	for char in s:
		freq[char] = freq.get(char, 0) + 1
	max_heap = [(-count, char) for char, count in freq.items()]
	heapify(max_heap)
	
	while len(max_heap) >= k:
		popped = []
		for _ in range(k):
			popped.append(heappop(max_heap))
		
		for count, char in popped:
			res += char
			if count < -1:
				heappush(max_heap, (count+1, char))
	
	while max_heap:
		count, char = heappop(max_heap)
		if count < -1:
			return ''	
		res += char
	return res

#time: o(nlogn)
#memory: o(K)
```

**Review 1**
Easy, crushed it (helps that the previous problem was [[Reorganize string]])!

#review 


