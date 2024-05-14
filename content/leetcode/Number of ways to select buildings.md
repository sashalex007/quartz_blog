
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


#review 
