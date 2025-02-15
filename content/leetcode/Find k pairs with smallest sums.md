---
date: 2024-10-02
---
**Link:** https://leetcode.com/problems/find-k-pairs-with-smallest-sums/
#### Solution:

**Topics**: [[heap]]

**Intuition**
This is a very subtle problem and it took me a while to figure out how to approach it. I initially thought it could be solved with two pointers like merging two sorted lists but this approach fails because this approach is limited to generating only `m+n` pairs, but in this problem `k` can go all the way up to `n*m`! 

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

**Review 1**
Insane problem! I knew it was heap but I went down the wrong path. I thought this could be treated like kth smallest...but this only works if you work through all possible pairs because we must rely on the top of the heap to increment `i` and `j`! If we use the kth smallest technique then we would have to maintain a max_heap...and if we do that, there is no way to traverse the pairs because we get stuck with k values in the heap and the top remains static. The simpler approach alluded me. 

Essentially, we keep a min heap. The top of the heap is always the current smallest pair....so we pop it off and add it to the result. Then the next smallest pair is either `(i+1, j)` or `(i, j+1)`! So we add both to the min heap and repeat k times. Thats it. 

The idea here is that there is potentially alot more than `k` elements in in the heap, and we rely on the heap to tell us which is smallest. So kth smallest cannot work because it can never exceed size `k`. 

I'm labeling this niche because you would rarely use a heap in this way, but it does make sense. 

#review 
#hard 
#niche 


