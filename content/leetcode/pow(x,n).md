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

I'm tagging this as hard because it's a math rule that you more or less have to remember. Remember that in [[binary exponentiation]] we don't use exponentiation itself! Think of binary exponentiation as accumulating a result while decreasing `n` and/or modifying `x`. Not too dissimilar from a [[reservoir]]. 

So we initialize our reservoir to `1`. If `n` is odd, we take out a factor and multiply the reservoir by `x`, and decrement `n`. If `n` is even, we square `x` and integer divide `n` by 2! Now you might think, how does this eventually accumulate into the result if we only square the base and do nothing to the reservoir? The fact is, when `n == 1` , the result will get multiplied by the base, so eventually the complete the result will get updated. 

We have to turn negative cases into positive cases prior to using this algorithm. How? We can ignore the polarity of `x` because the algorithm will take care of itself through multiplication, but if `n` is negative this is a problem. How do we transform this into a positive case? We simply make `n` positive and set `x` to the inverse of itself `1/x`. Why?

```
a = x^(-n)
a = x^(-1*n)
a = x^(-1)*(n)
    ^^^^^ 
a = (1/x)^n   

So we isolate the negative, which is equivalet to inverting the base!
```

#hard 
#review 


