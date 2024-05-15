---
date: 2024-05-15
---
**Link:** https://leetcode.com/problems/roman-to-integer/
#### Solution:

**Topics**: [[math]]

**Intuition**
This problem is quite simple once you wrap your head around the logic. Basically, each letter in the roman numeral maps to a positive value UNLESS its followed by a larger letter...in that case the contribution of the letter is negative. 

The last letter can never be negative because nothing follows it. 


**Implementation**
```python
def roman_to_integer(s):
	mapping = {
		'I': 1,
		'V': 5,
		'X': 10,
		'L': 50,
		'C': 100,
		'D': 500,
		'M': 1000
	}
	val = 0
	for i in range(len(s)-1):
		if i == len(s)-1 or mapping[s[i]] >= mapping[s[i+1]]:
			val += mapping[s[i]]
		else:
			val -= mapping[s[i]]
	return val

#time: o(n)
#memory: o(1)
```

**Visual** 
![[IMG_2F9437E0EA28-1.jpeg]]


#review 


