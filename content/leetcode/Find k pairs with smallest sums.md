---
date: 2024-10-02
---
**Link:** https://leetcode.com/problems/find-k-pairs-with-smallest-sums/
#### Solution:

**Topics**: [[heap]]

**Intuition**
This is a very subtle problem and it took me a while to figure out how to approach it. I initially thought it could be solved with two points like merging two sorted lists but this approach fails because this approach is limited to generating only `m+n` pairs, but in this problem `k` can go all the way up to `n*m`! 

There is a very simple and elegant way to use a min heap to generate all the pairs. Basically if `nums1[i] + nums2[j]` is the smallest pair, then the next smallest pair will be either `nums1[i+1] + nums2[j]` or `nums1[i] + nums2[j+1]`! 

We know the first pair will always be `(nums1[0], nums2[0])`, so we push the tuple `(nums1[0]+nums2[0], 0, 0)` to the min heap. While `len(res) < k`, pop off the heap and append `(nums1[i], nums2[j])` to the result. Then push `(nums1[i+1]+nums2[j], i+1, j)` and `(nums1[i]+nums2[j+1], i, j+1)` if `i` and `j` are in bounds. 

One key consideration is duplicates, so it's important to keep a visited set to avoid them. Why can duplicates arise? 

```
                   i+1  j+1
                    (0, 0) 
                  /        \
           (0, 1)           (1, 0)
            /   \            /   \
      (1, 1)    (0, 2)  (2, 0)   (1, 1)
        ^                          ^    ---> duplicates!
```

This is essentially why we cache [[DP]] functions in take/skip patterns. For example an uncached function `dfs(i, j)` is `o(n*n*n)`  but a cached function is `o(n*n)`.

**Implementation**
```python
def k_smallest_pairs(nums1, nums2, k):
	res = []
	min_heap = [(nums1[0]+nums2[0], 0, 0)]
	visited = set()
	while len(res) < k:
		_, i, j = heappop(min_heap)
		res.append((nums1[i], nums2[j]))
		if i < len(nums1)-1 and (i+1, j) not in visited:
			heappush(min_heap, (nums[i+1]+nums[j], i+1, j))
			visited.add((i+1, j))
		if j < len(nums2)-1 and (i, j+1) not in visited:
			heappush(min_heap, (nums[i]+nums[j+1], i, j+1))
			visited.add((i, j+1))
	return res

#time: o(klogk)
#memory: o(k) 
```

#review 


