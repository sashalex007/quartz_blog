---
date: 2024-09-18
---
**Link:** https://leetcode.com/problems/greatest-common-divisor-of-strings/
#### Solution:

**Topics**: [[math]]

**Intuition**
The brute force solution is relatively simple...the idea is just to try all substrings of the smaller of the two strings...this is an `o(n*n)` solution. There is however a more interesting trick. 

Essentially, if there exists a common divisor the following property must be true: `s1+s2 == s2+s1`. In other words the string must be commutative. Why is this the case? I don't really know but we can prove it with some examples:

```
s1 = abc
s2 = abcabc
s1+s2 = abcabcabc
s2+s2 = abcabcabc #same

s1 = abababab
s2 = abab
s1+s2 = abababababab
s2+s1 = abababababab #same

```

If the commutative property holds true, we know there is a common divisor so how do we find it? Well, its simply a math problem now. The greatest common divisor will simply be the greatest common divisor of `len(s1)` and `len(s2)`! Once this value is obtained, we can simply slice the substring it off the front of either string. 

Why is this the case? Because it stands to reason that whatever the greatest common divisor is, it will evenly divide both strings such that `len(s1) % len(divisor) == 0` and `len(s2) % len(divisor) == 0`. So lets say we have found the length of the divisor, how do we get the string? Since the divisor is guaranteed to be repeating, we can get it by slicing from any delimiting partition...the easiest of which is `s[:len_divisor]`. 

**Implementation**
```python
def gcd_string(str1, str2):
	if str1 + str2 != str2 + str1:
		return ''
	gcd_length = gcd(len(str1), len(str2))
	return str1[:gcd_length]

#time: o(n+m)
#memory: o(n+m)
```

#review 


