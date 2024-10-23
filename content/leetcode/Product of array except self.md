---
date: 2024-08-15
---
**Link:** https://leetcode.com/problems/product-of-array-except-self/
#### Solution:

**Topics**: [[prefix sums]]

**Intuition**
Not a very difficult problem...basically we borrow the idea from prefix and suffix sums, but instead of sums we make it the running product at every `i` . Then to get the product of the array except self, we can perform `prefix[i-1]*postfix[i+1]`. Thats all there is to it because multiplication is  commutative. 

**Implementation**
```python
def product_except_self(nums):
	n = len(nums)
	pre = [-1] * n
	post = [-1] * n
	res = [-1] * n

	pre[0] = nums[0]
	for i in range(1, n):
		pre[i] = pre[i-1]*nums[i]
	post[-1] = nums[-1]
	for i in range(n-2, -1, -1):
		post[i] = post[i+1]*nums[i]
		
	res[0], res[-1] = post[1], pre[-2]
	for i in range(1, n-1):
		res[i] = pre[i-1] * post[i+1]
	return res

#time: o(n)
#memory: o(n)
```

**Review 1**
Easy problem. Be mindful of edge cases. 

#review 


