---
date: 2024-09-06
---
**Link:** https://leetcode.com/problems/powx-n
#### Solution:

**Topics**: [[math]]

**Intuition**
For this problem, we use a technique called binary exponentiation. This problem also answers the question why exponentiation is logarithmic time complexity. 

Basically we use the following 3 mathematical properties: 
```
1.
a = x^n
a = x^2(n/2)

2.
a = x^n
a = x(x^(n-1))

3.
a = x^-n
a = (x^-1)^n
a = (1/x)^n
```

1.  The first property is taking a 2 out of the exponent, effectively squaring the base. Note that this only behaves nicely when `n` is even. 
2. The second property is if `n` is odd, we simply decrement the exponent and bring down the multiplication.
3. The third property is handling the negative `n` case. We simply make it a positive case by extracting a -1 from n, and because `x^-1 = 1/x`, this now becomes a positive `n` case. 

So by squaring x in the even case, we bring this down to `logn` time complexity because `n` is exponentially decreasing. Of course the brute force solution is to multiply by x `n` times, but if `n` is large like in the constraints, then the linear solution will not suffice. 

**Implementation**
```python
def power(x, n):
	if n < 0:
		n *= -1
		x = 1.0 / x

	result = 1
	while n > 0:
		if n % 2 == 1:
			result *= x
			n -= 1
		x *= x
		n //= 2
		
	return result

#time: o(logn)
#memory: o(1)
```

#review 


