---
date: 2024-05-15
---
**Link:** https://leetcode.com/problems/number-of-ways-to-select-buildings/
#### Solution:

**Topics**: [[greedy]], [[reservoir]]

**Intuition**
Very cool problem requiring subtle reservoir pattern. The idea is that there are only two possibilities for building selection: `010 and 101`. 

The key insight is that when we see a 1, we can form exactly `number_of_zeros` 01's...keep the count in  `zero_ones` . And when we see a 0, we can form exactly `number_of_ones` 10's...keep the count in `one_zeros`. 

The second key insight (building from the first) is that when we see a 1, we can form exactly `one_zeros` 101's. And when we see a 0, we can form exactly `zero_ones` 010's. Add  these to the result. 

**Implementation**
```python
def select_buildings(s):
	res = 0
	ones = 0
	zeros = 0
	one_zeros = 0
	zero_ones = 0
	for bit in s:
		if bit == '1':
			res += one_zeros
			zero_ones += zero
			ones += 1
		else:
			res += zero_ones
			one_zeros += ones
			zeros += 1
	return res

#time: o(n)
#memory: o(1)
```

**Visual** 
![[IMG_A4CA199A4E6A-1.jpeg]]

**Review 1**
Fantastic little problem. My mind first went to sliding window, but there is not really a great way to keep manipulate the window (if it's even possible). The counting solution is extremely clever. Basically we count every occurrence of `'0'`, `'1'`, `'01'` and `'10'`. How?

Well if we reach a `'1'` then the number of `'01'` is simply incremented by the number of `0` that we have already seen, because with the current `'1'`, we can form a `'01'` with all occurrences of `0` that have been seen so far!

And by the same logic,  the number of `'010'` and `'010'` (the only possible valid selections) are incremented by the number of `'01'` when a `'0'` is seen and `'10'` when a `'1'` is seen...respectively. 

#review 
