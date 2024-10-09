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

**Review 1**
Pretty easy problem but I'm not a fan of the above implementation because it is not very generic as it relates to [[Integer to roman]]. Here is an alternate implementation that is basically the reverse of that problem:

**Implementation (generic)**
```python
def romtoint(s):
	mapping = {
		'I': 1,
		'V': 5,
		'X': 10,
		'L': 50,
		'C': 100,
		'D': 500,
		'M': 1000,
		'IV': 4,
		'IX': 9,
		'XL': 40,
		'XC': 90,
		'CD': 400,
		'CM': 900
	}
	val = 0
	i = 0
	while i < len(s)-1:
		one = s[i]
		two = s[i] + s[i+1]
		if two in mapping:
			val += mapping[two]
			i += 2
		else:
			val += mapping[one]
			i += 1
	  
	if i != len(s):
		val += mapping[s[-1]]
	return val

#technically the time complexity is 2n, but whatever, numerals only go up to 3999
```

#review 


