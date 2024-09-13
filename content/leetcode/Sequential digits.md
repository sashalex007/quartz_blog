---
date: 2024-07-17
---
**Link:** https://leetcode.com/problems/sequential-digits/
#### Solution:

**Topics**: [[sliding window]]

**Intuition**
This is kind of an interesting problem. If the digits must be strictly increasing, then all digits within any interval can be formulated by moving a window over the string `'123456789'`. Generating all possible increasing digits is thus only an `n**3` operation where `n=9`...this is almost negligible. 

**Implementation**
```python
def seq_digits(low, high):
	res = []
	nums = '123456789'
	for i in range(1, len(nums)):
		for j in range(i, len(nums)):
			num = int(nums[j-i:j+1])
			if num >= low and num <= high:
				res.append(num)
	return res

#time: o(9**3)
#memory: o(1)
```

**Mnemonic**
All valid sequential numbers with strictly increasing digits exist as a subarray in `'123456789'`

**Visual** 
![[IMG_A818E8810056-1.jpeg]]

#review 


