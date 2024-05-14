
**Link:** https://leetcode.com/problems/shortest-and-lexicographically-smallest-beautiful-string/
#### Solution:

**Topics**: [[subarray]], [[sliding window]]

**Intuition**
Not much to this problem except being mindful of edge cases. Keep a sliding window, a count of ones, and the current length of the result. While `one_count == k` , shrink the window. While shrinking the window, if the length `r - l + 1` is smaller than length of the current result, update the result to the current slice `s[l:r+1]`. 

If the length of the window is the same as the length of the current result, do a lexicographical compare on both strings and update the result.

NOTE: a frequency map is not needed here because the only frequency we care about is that of the 1's...so this can simply be stored in an integer.

**Implementation**
```python
def beautiful_string(s, k):
	res = None
	length = float('inf')
	one_count = 0
	l = 0
	for r in range(len(s)):
		if s[r] == '1':
			one_count += 1
		while one_count == k:
			if r - l + 1 < length:
				res = s[l:r+1]
				length = r - l + 1
			if r - l + 1 == length:
				potential = s[l:r+1]
				res = potential if potential < res else res
			if s[l] == '1':
				one_count -= 1
			l += 1
	return res if res else ''

#time: o(n**2)
#memory: o(1) ...or o(n) if considering the result (worst case its the whole string)
```

**Visual** 


#review 


