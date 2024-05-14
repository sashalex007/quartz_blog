
**Link:** https://leetcode.com/problems/minimum-average-difference/
#### Solution:

**Topics**: [[subarray]]

**Intuition**
Pretty basic problem with some annoying implementation and a division by zero edge case. Basically the idea is to keep a sum of the left partition an right partition and compute the average difference. 

The first insight is that we only need the sum of the left partition...the sum of the right is just `total_sum - left_sum` 

The second insight is that according to the problem statement, the left partition includes the value at the index, so the number of elements in the left is always `i+1`.  Ergo, the number of elements in the right is `len(nums)-(i+1)`... which will lead to division by zero on the last index, so we must handle this edge case. 

**Implementation**
```python
def min_avg_diff(nums):
	total = sum(nums)
	res = -1
	min_diff = float('inf')
	left_sum = 0
	for i in range(len(nums)):
		left_sum += nums[i]
		right_sum = total - left_sum
		left_avg = left_sum // (i + 1)
		right_avg = right_sum // max(1, (len(nums) - (i + 1)))
		diff = abs(left_avg - right_avg)
		if diff < min_diff:
			min_diff = diff
			res = i
	return res

#time: o(n)
#memory: o(1)
```

**Visual** 
![[IMG_16F7A4A56DB4-1.jpeg]]

#review 


