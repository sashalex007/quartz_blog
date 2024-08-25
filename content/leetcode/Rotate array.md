---
date: 2024-08-25
---
**Link:** https://leetcode.com/problems/rotate-array/
#### Solution:

**Topics**: [[in-place]]

**Intuition**
There is a very cool trick here to solve the problem in constant space. The trick is somewhat obvious but admittedly, somehow I could not come up with it until reading hint 2. Basically the idea is to reverse the list and then again reverse the rotated partitions. Thats it. 

For example:
```
[1,2,3,4,5,6] k=3 ----> [4,5,6,1,2,3]
                         ^ ^ ^

Reverse the list:

[6,5,4,3,2,1]
 
Take a look at the partitions that we want to rotate:

[6,5,4,3,2,1] 
 ^ ^ ^ -----

We can observe that reversing the partitions will yield the correct array:
[4,5,6,1,2,3]

```

**Implementation**
```python
def rotate_arr(nums):
	def rev(l, r):
		while l < r:
			nums[l], nums[r] = nums[r], nums[l]
			l += 1
			r -= 1

	k %= len(nums)
	rev(0, len(nums)-1)
	rev(0, k-1)
	rev(k, len(nums)-1)

#time: o(n)
#memory: o(1)
```

**Mnemonic**
Rotate ---> Reflect! (this works for rotate matrix too, minus the transpose)

#review 


