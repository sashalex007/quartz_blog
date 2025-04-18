---
date: 2024-08-23
---
**Link:** https://leetcode.com/problems/search-in-rotated-sorted-array/
#### Solution:

**Topics**: [[binary search]]

**Intuition**
This can be quite a tricky binary search problem, but it is actually quite simple if we can make a key observation about sorted rotated arrays. No matter what, either the left or right partition (from the midpoint) is **guaranteed** to be sorted! Both would be sorted in the case that there is no rotation (pivot index = 0). 

For example:
```
[7,8,1,2,3,4,5] #7,8 rotated, right partition sorted
       ^ ---->

[3,4,5,6,7,8,9,0,1,2] #0,1,2 rotated, left partition sorted
 <------ ^        

[6,7,8,9,1,2,3,4,5]  # 1,2,3,4,5 rotated, left partition sorted
         ^ ------> 
```

How does this help us? Its very simple. We determine which partition is sorted, and then decide if the target is in that range. If it is, we move to that partition. If its not, we move to the other partition. Thats it. 

**Implementation**
```python
def rotated_array_search(nums, target):
	l = 0
	r = len(nums)-1
	while l <= r:
		mid = (l + r) // 2
		if nums[mid] == target:
			return mid

		if nums[mid] >= nums[l]: #left partition is sorted
			if target < nums[mid] and target >= nums[l]:
				r = mid - 1
			else:
				l = mid + 1								
		if nums[mid] <= nums[r]: #right partition is sorted
			if target > nums[mid] and target <= nums[r]:
				l = mid + 1
			else:
				r = mid - 1
	return -1

#time: o(logn)
#memory: o(1)
```

**Mnemonic**
You are standing somewhere on a hill. One side of the hill is smooth, the other side has a bump in it. 

**Visual** 
![[IMG_6E7F6DAC6799-1.jpeg]]

**Review 1**
I don't know why I always struggle with this problem. I did get there but it took me way too long. This problem should take no more than 30 seconds of thinking!

Its very simple: If the left partition is sorted and the target is in it's range, go left! Otherwise, go right! If the right partition is sorted and the target is in it's range, go right! Otherwise, go left! 

**REMEMBER, YOU CAN ONLY SEARCH THROUGH A SORTED LIST** so determine which side is sorted and search it or go to the unsorted part!!!. 

I'm tagging this hard, not because it's hard (it's absurdly easy) but because for reasons unbeknownst to me, my brain shuts off for this problem. 

**Review 2**
Still somehow struggled more than I had to, but overall figured it out pretty fast despite hitting an edge case. I missed the fact that `left_sorted = nums[mid] > nums[l]` actually fails when the list is smaller than length 3. I made this oversight because all numbers in `nums` are guaranteed to be distinct however when `len(nums) < 3`, then `mid = l` . It should be `left_sorted = nums[mid] >= nums[l]`. Dumb oversight. 

#review 
#hard 


