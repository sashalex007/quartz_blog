---
date: "2025-04-25"
---
**Link:** https://leetcode.com/problems/plus-one
#### Solution:

**Topics**: [[math]]

**Intuition**
Simple problem, too easy. Nice practice for modulus trick though!

**Implementation**
```python
def plusone(digits):
	digits = digits[::-1]
	num = 0
	while digits:
		num *= 10
		num += digits.pop()
	num += 1
	  
	res = []
	while num:
		res.append(num % 10)
		num //= 10
	return res[::-1]
	
#time: o(len(digits))
#memory: o(len(digits)+1)
```

#review 


