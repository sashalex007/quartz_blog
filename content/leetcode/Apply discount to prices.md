---
date: 2024-05-15
---
**Link:** https://leetcode.com/problems/apply-discount-to-prices/
#### Solution:

**Topics**: [[subarray]]

**Intuition**
The code kind of speaks for itself in this case. Just split the string by spaces and check if the first character is `$`, if so then check if everything following `$` is a digit, if so apply the discount. 

The discount calculation must be converted into the appropriate multiplication. For example, a discount of 80% is a multiplication by 0.2. Therefore the formula is as follows:

```
multiplier = (100 - discount)/100
```

**Implementation**
```python
def apply_discount(sentence, discount):
	words = sentence.split(' ')
	for i in range(len(words)):
		if words[i][0] != '$':
			continue
		price = words[i][1:]
		if price.isdigit():
			words[i] = f"${(int(price) * ((100 - discount)/100)):.2f}"
	return ' '.join(words)

#time: o(n)
#memory: o(1)
```

**Visual** 
![[IMG_A7DD865CDA2D-1.jpeg]]

#review 


