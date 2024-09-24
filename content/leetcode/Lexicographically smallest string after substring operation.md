---
date: 2024-09-24
---
**Link:** https://leetcode.com/problems/lexicographically-smallest-string-after-substring-operation/
#### Solution:

**Topics**: [[string]], [[sorted order]]

**Intuition**
Funny little problem. I misread it at first, and just shifted all possible subsequence to their respective preceding letters. This is incorrect, as the problem allows you to change only one contiguous substring. So which substring to change to get the smallest lexicographical string? The first one!

Basically, we cannot change any `'a'` because the preceding character is `z` which is always lexicographically greater. This means that we much change the first substring that we can, and then stop. 

For example:
```
s = 'aaaabbaacaa'
         ^^

We can only change substring 'bb' in this case. Why not also `c`? Because then we are changing a subsequence which is against the rules. 


a = 'bbbbb'
	 ^^^^^
	 
We can change all the letters. 


s = 'aaaaaaaaa'
             ^

We must change the 'a' to 'z' in this case. The resulting string is lexicographically larger but we are forced to change at least one non-empty substring and changing the last letter is the smallest change we can make. 
```

Note that we always change the first substring we can, as this change will have the greatest lexicographical delta. 

**Implementation**
```python
def smallest_substr(s):
	smallest = ''
	changed = False
	early_exit = False
	
	for char in s:
		if char != 'a' and not early_exit:
			smallest += chr(ord(char)-1)
			changed = True
		else:
			smallest += char
			if changed:
				early_exit = True
			
	if smallest == s:
		return smallest[:-1] + 'z'
	return smallest
	
#time: o(n)
#memory: o(1)
```

**Visual**
![[IMG_AD4F0D01AF26-1.jpeg]]

#review 
#hard 


