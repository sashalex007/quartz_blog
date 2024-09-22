---
date: 2024-09-22
---
**Link:** https://leetcode.com/problems/find-missing-observations/
#### Solution:

**Topics**: [[math]]

**Intuition**
This is a cool little math problem, although a fairly trivial one. The key idea is to calculate the sum of the rolls that are missing, and then distribute them, if possible, across `n`. 

We have the `mean`, the known partition `rolls`, and the length of the unknown partition. There for the sum of the unknown partition is `mean*(n+m) - sum(rolls)`. Now we can compute the mean of the unknown partition with the formula `unknown_sum/n`. 

If the mean of the unknown partition is greater than 6, then it cannot be distributed because at least one roll would have to be 7, which is not possible on a six sided die. If the mean is smaller than 1, that means at least one roll would have to be 0...also not possible on a 6 sided die. 

If the mean is between 1 and 6 (inclusive), to create the result we simply integer divide the mean across `n` and then distribute the remainder evenly (if there is a remainder). 

**Implementation**
```python
def find_missing(rolls, mean, n):
	missing_sum = ((n+len(rolls))*mean)-sum(rolls)
	missing_mean = missing_sum / n
	if missing_mean < 1 or missing_mean > 6:
		return []
	missing = [missing_sum//n]*n
	for i in range(missing_sum % n):
		missing[i] += 1
	return missing

#time: o(m+n)
#memory: o(n)
```

#review 


