---
date: 2024-09-29
---
**Link:** https://leetcode.com/problems/maximum-product-subarray/
#### Solution:

**Topics**: [[kadanes]], [[subarray]]

**Intuition**
Very tricky subarray problem! I initially solved in in `o(2n)` with what I consider to be a more intuitive solution, however there is also a very clever `o(n)` solution that leverages a modified [[kadanes]] algorithm. I will cover both solutions. 

A key observation for this problem is that the max product subarray cannot have a `0`. The next observation is that the number of negatives should ideally be even such that they cancel each other out. This immediately rules out sliding window as a currently negative subarray can be flipped to positive at any point in the future. 

So lets say we have a array with an odd number of negatives:
```
[1,-1,-2,1,-2]
    ^  ^    ^   odd number of negatives

How do we get the max product subarray of this array?

We can see that the max product subarray will be [-2,1-2]...so what did we do there?

To get the max product subarray we removed the leftmost subarray that contained a negative!  removed: [1,-1]



Lets look at another case:

[-2,1,-2,-1,1]
  ^    ^  ^   odd number of negatives

We can see that the max product subarray will be [-2,1-2]....what is the pattern?

We removed the right-most negative subarray [-1,1]
```

Hopefully the pattern is clear. For an negative product subarray, we remove either the the leftmost or rightmost negative subarray...or more efficiently we can simply do two passes over it while taking the max! 

Remember earlier that the max product subarray cannot contain a `0`, so we simply reset the product when `0` is encountered. 

**Implementation (two pass)**
```python
def max_prod(nums):
	if len(nums) == 1:
		return nums[0]
		
	def helper(nums):
		max_product = 0
		product = 1
		for num in nums:
			if num == 0:
				product = 1
				max_product = max(max_product, 0)
			else:
				product *= num
				max_product = max(max_product, product, num)
		return max_product

	return max(helper(nums), helper(nums[::-1]))
	
#time: o(2n) ...or o(3n) if we use reverse
#memory: o(1)
```


Lets now get into the other approach. Basically we can modify [[kadanes]] algorithm to solve this problem in exactly `o(n)`. How do we do it? Well, the purest form of [[kadanes ]] is the problem [[Maximum subarray]]. That problem is very straight forward, but this one is not. 

The [[Maximum subarray]] implementation of [[kadanes]] is essentially a implicit sliding window. When `curr > curr+prev`, we reset the start of the window to `curr`:

```
[1,-1,-2,2,3,4]
 1 -1 -3 2 5,9   #kadanes 
         ^
         start new window because 2 > 2 + -3
```

This simplistic approach works well for sums but for max product, we have a problem. We cannot start a new window every time `curr > curr * prev`, because that same window could be flipped to positive if another negative number is encountered in the future. So how we keep these negative product subarrays under consideration? 

The answer is to force [[kadanes]] to keep track of two quantitates: `max_product` and `min_product`!  We do this because the `min_product` can at any point become the `max_product` with the right number! 

The reason this works is because we don't have to consider **all** negative product subarrays, only the smallest one because thats the only one that has the potential to be flipped into the max product subarray!

For example:
```
    [-2, 1,-2,-1]
max  -2  1 -2  4 <--- the min became the max because we did not discard -4!
min  -2 -2 -4 -1 
            ^    
```

The logic to implement this should be pretty straight forward. The one consideration is the need for a temp variable depending on which quantity (min or max) we choose to evaluate first, as there is a dependency there. 

**Implementation (kadanes)**
```python
def max_prod(nums):
	max_prod = nums[0]
	min_prod = nums[0]
	res = max_prod
	
	for num in nums[1:]:
		temp_max = max(num, max_prod*num, min_prod*num) 
		min_prod = min(num, max_prod*num, min_prod*num) 
		#max_prod is a dependency of min_prod...or vice versa
		max_prod = temp_max
		res = max(res, max_prod)
	return res
```

#review 
#hard 

