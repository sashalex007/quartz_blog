---
date: 2024-07-12
---
**Link:** https://leetcode.com/problems/validate-ip-address/
#### Solution:

**Topics**: 

**Intuition** 
Kind of a boring problem, but the code can get hairy if the approach is suboptimal. The key to coding this up with any semblance of simplicity is to construct the logic around the counter case. So instead of checking if the address is valid, we check if its not valid, and only return the result if all the checks have been passed. 

The code more or less writes itself... the hardest part (not hard at all) is realizing that ipv4 addresses have dots and ipv6 addresses have colons. So we can use this property to isolate the logic for each. 

There is a key edge case in ipv4 logic, specifically type checking a string with leading zeros plus some digits. `int(x)` and `x.isdigit()` will both return true if an integer can still be made despite the leading zeros. For example: `'00'`. So we must explicitly check if the string is longer than 1 and has a leading zero (because we don't want to disallow `'0'`). 

**Implementation**
```python
def validate_ip(queryIP):
	if '.' in queryIP:
		ip = queryIP.split('.')
		if len(ip) != 4:
			return 'Neither'
		for x in ip:
			if x.isdigit() and not (len(x) > 1 and x[0] == '0'):
				x = int(x)
				if x > 255 or x < 0:
					return 'Neither'
			else:
			 return 'Neither'
		return 'IPv4'

	if ':' in queryIP:
		ip = queryIP.split(':')
		allowed = set(list('1234567890abcdefABCDEF'))
		if len(ip) != 8:
			return 'Neither'
		for x in ip:
			if len(x) > 4 or len(x) == 0:
				return 'Neither'
			for char in x:
				if char not in allowed:
					return 'Neither'
		return 'IPv6'
				
	return 'Neither'
	
#time: o(n)
#memory: o(1)
```

**Mnemonic**
Two hurdlers take off on a race. One hurdler bears the number 4, and the other bears the number 6. The race is such that only one hurdler can win. The hurdles represent the logical counter cases.

**Visual** 
![[IMG_D610285C4E49-1.jpeg]]

**Review 1**
Too easy, skipping this one. 

#review 


