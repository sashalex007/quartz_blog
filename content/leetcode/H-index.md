---
date: 2024-09-16
---
**Link:** https://leetcode.com/problems/h-index/
#### Solution:

**Topics**: [[binary search]], [[greedy]]

**Intuition**
This is a nice little binary search problem with also a more subtle `o(n)` solution. The binary search solution is pretty straight forward. The idea is that for any `h_index`, `h_index-1` is also a valid index. For example if 3 papers have at least 3 citations then it is guaranteed that 2 papers have at least 2 citations. The sorted order comes from this property, the lower bound is 0 and the upper bound is `len(citations)`. 

**Implementation (binary search)**
```python
def h_index(citations):
	def is_valid(h):
		count = 0
		for c in citations:
			if c >= h:
				count += 1
		return count >= h

	res = 0
	l = 0
	r = len(citations)
	while l <= r:
		mid = (l + r) // 2
		if is_valid(mid):
			res = mid
			l = mid + 1
		else:
			r = mid - 1
	return res

#time: o(nlogn)
#memory: o(1)
```


The greedy linear implementation is a bit more subtle. Essentially we initialize a list with all possible counts and then increment the values when such a citation count is seen. Then we can iterate through that array backwards and "accumulate" the counts. When that accumulation matches or exceeds the current index (which is the count), that index becomes the H-index. 

**Implementation (greedy)**
```python
def h_index(citations):
	n = len(citations)
	counts = [0]*(n+1)
	for c in citations:
		counts[min(c, n)] += 1

	cit_count = 0
	for i in range(n, -1, -1):
		cit_count += counts[i]
		if cit_count >= i:
			return i

#time: o(n)
#memory: o(n)
```

#review 


