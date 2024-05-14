
**Link:** https://leetcode.com/problems/reordered-power-of-2/
#### Solution:

**DSA**: [[hash map]], [[permutation]]

**Intuition**
A naive approach to this problem would be to generate all possible permutations of the digits in `n` and check if each one of them is a power of 2. 

A better solution is realizing that the if any permutation of `n` is a power of 2, then the frequency map of the digits in `n` will be exactly the same as the frequency map of the digits in the corresponding power of 2. 

Taking the hash map approach, we can represent all possible permutations as a frequency map. The only thing we lose in the frequency map is the ordering, but we don't need that information! All we must do, is find all powers of 2 that could possibly be a candidate for `n`. Valid candidates will have the same number of digits as n.


**Implementation**
```python
def power_of2(n):
	n = str(n)
	potential_powers = []
	curr_power = 1
	while len(str(curr_power)) <= len(n):
		if len(str(curr_power)) == len(n):
			potential_powers.append(str(curr_power))
		curr_power *= 2

	freq_n = {}
	for char in n:
		freq_n[char] = freq_n.get(char, 0) + 1
		
	for power in potential_powers:
		freq_p = {}
		for char in power:
			freq_p[char] = freq_p.get(char, 0) + 1
		if freq_p == freq_n:
			return True
	return False
			
#time: O(logn)
#memory: O(1)
```

**Visual** 
![[IMG_2261B2000F2F-1.jpeg]]

#review 


