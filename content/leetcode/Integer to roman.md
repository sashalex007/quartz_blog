---
date: 2024-09-28
---
**Link:** https://leetcode.com/problems/integer-to-roman/
#### Solution:

**Topics**: [[math]], [[Roman to integer]]

**Intuition**
There is really not much to this problem if you know how roman numerals work. Basically the process of converting integer to roman is **subtractive**. Roman numerals each have some value, and the next roman numeral for a particular number will be the numeral with the largest value that can be taken subtracted from the current number...then we subtract it, append the numeral and repeat the process. 

This is the reverse of the process used in [[Roman to integer]]. There, we used addition to add the current numeral's numerical value to the result...or the current and the next numeral in the case of the doubles (900 = CM)

**Implementation**
```python
def int_to_roman(num)
	numerals = [('I',1),('IV',4),('V',5),('IX',9),('X',10),('XL',40),('L',50),('XC',90),('C',100),('CD',400),('D',500),('CM',900),('M',1000)]

	roman = ''
	while num > 0:
		for numeral, val in numerals[::-1]:
			if num >= val:
				num -= val
				roman += numeral
				break
	return roman

#time: o(1)
#memory: o(1)
```

#review 


