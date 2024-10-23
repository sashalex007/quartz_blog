---
date: 2024-08-15
---
**Link:** https://leetcode.com/problems/merge-sorted-array/
#### Solution:

**Topics**: [[sorted order]]

**Intuition**
This is a very interesting problem if we aim for a constant space solution. Merging two sorted arrays is not very difficult because typically you would use two pointers and fill a **new** array with the values. This of course take `o(n+m)` space. In this problem we are given `nums1` with enough trailing zeros to store the merged list...and in fact the problem statement does imply that the algorithm should be constant space. So how do we merge `nums1` with `nums2` using only constant space?

I will admit that I struggled with this one and initially I came up with an `o(n*m)` solution. I thought this was ok because `n` and `m` are constrained to only `200`. But this did not sit with me well because my gut told me that there had to be a linear solution, and indeed there is. 

The key here is to start filling up `nums1` **from the end**. The reasoning here is that the zeros are at the end, so by starting there we avoid overwriting and/or complicated pointer logic. Typically, merging sorted arrays is done from front to back with the condition `a < b`...  but this logic can be flipped to `a > b` if we choose to start from the back because the end of the merged list will be the largest value!

The implementation is a [[three pointer]] solution, and its still kind of tricky with many potential off-by-one errors. 

The key takeaway from this problem is that when we modify arrays **in-place**, we should consider starting (and continuing) the algorithm in the empty spaces. 

**Implementation**
```python

#just like in normal merging sorted lists problems, one list will be exhaused before the other. In this case its a little tricky because we are moving the pointers from right to left and python allows for negative indexing.



def merge_sorted(nums1, m, nums2, n):
	p1 = m - 1
	p2 = n - 1
	p3 = m + n - 1
	while p3 > -1:
		if p2 < 0: 
			break  
			#if p2 is finished, just exit. 
			#this is because the rest of nums1 is guartanteed to be sorted
			#for example nums1 = [1,2,3,0,0,0] nums2 = [4,5,6]
			#Exiting is simple stopping here [1,2,3,4,5,6]
            #                                     ^ p2 = -1
            
            # there is no need to keep replacing until the end...its spurious
            # in fact it would  introduce many edge cases 
            
		if p1 > -1 and nums1[p1] > nums2[p2]: 
		#  ^^^^^^^  if p1 is exhausted first, just keep replacing with p2
			nums1[p3] = nums1[p1]
			p1 -= 1
		else:
			nums1[p3] = nums2[p2]
			p2 -= 1
		p3 -= 1
	

#time: o(n+m)
#memory: o(1)
```

**Mnemonic**
I don't have a good one here....just think   **in-place**--->**start-where-empty**

**Review 1**
This problem goes to show that my mnemonics and images don't work. I remembered the trick without issue. 

#review 
#hard 


