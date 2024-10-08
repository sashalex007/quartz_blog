---
date: 2024-05-15
---
**Link:** https://leetcode.com/problems/maximum-length-of-a-concatenated-string-with-unique-characters/
#### Solution:

**DSA**: [[DFS]], [[set]], [[subsequence]], [[grow]]

**Intuition**
Depth first search is the first that comes to mind because we are looking for the maximum valid [[subsequence]]. DP does not apply here because the DFS will generate a unique string the vast majority of the time. Technically caching can be used but it would be a spurious consumption of memory. 

**Implementation**
```python
def max_len(arr):
	def dfs(i, curr):
		if i == len(arr):
			return 0
		take = 0
		potential_take = curr + arr[i]
		if len(potential_take) == len(set(list(potential_take))):
			take = len(arr[i]) + dfs(i+1, potential_take)
		skip = dfs(i+1, curr)
		return max(take, skip)
		
	return dfs(0, '')

#time: O(2**n)
#memory: O(n) because the max depth of the tree is len(arr)...base case
```

**Visual** 
![[blog/leetcode/_pics/IMG_61F38C310C1A-1.jpeg]]

**Review 1**
Again I was not sure if caching should be used or not. The constraints are tiny so either way works...but in this case it's better not to use it because the chances that you will get the same string at the same index are zero unless we have duplicates in `arr`. We can just clean `arr` from duplicates and get the best possible complexity which is `2**n` because we have to check all subsequences (where n is the length of the set of `arr`). 

#review 


