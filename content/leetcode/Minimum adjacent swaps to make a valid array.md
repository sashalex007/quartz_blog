---
date: 2024-08-10
---
**Link:** https://leetcode.com/problems/minimum-adjacent-swaps-to-make-a-valid-array/
#### Solution:

**Topics**: [[two pointer]]

**Intuition**
I'm not sure if this solution qualifies as the standard definition of of a [[two pointer]] algorithm, but I can't think of anything closer. 

Its very easy to make this problem more complicated than it really is...and that leads to very bloated code. All we need to do is find the leftmost smallest element and the rightmost largest element. The result is simply how far both are away from the stand and end of the array respectively. There is no need to perform actual swaps...we can compute the result directly using indices. 

There is one notable edge-case. If the smallest and largest elements have to cross each other to complete the swaps, then we can subtract 1 from the result because at some point, the smallest element will be swapped with the largest element. If this is not taken into account, we will end up overcounting by 1. For example:

```
   
[2,3,1,2]
   ^ ^ Smallest
   largest
   
The largest is 3 with and index of 1. 
The smallest is 1 with and index of 2....they must cross. 

If we compute the result with the indices, we find that 3 requires two swaps, and 1 also requires 2 swaps. So the result is 4? NO!

When 1 is swapped with 3 or vice versa, the adjacent element moves closer to it's destination by 1! So with 1 swap, we do the "work" of 2 swaps. 

So in the event that the elements must cross (if index_low > index_hi), we decrement the result by 1. 
```

**Implementation**
```python
def min_swaps(nums):
	res = 0
	hi = (float('-inf'), -1)
	low = (float('inf'), -1)
	for i, num in enumerate(nums):
		if num >= hi[0]:
			hi = (num, i)
		if num < low[0]:
			low = (num, i)
	res = low[1] + (len(nums)-1 - hi[1])
	res -= 1 if low[1] > hi[1] else 0
	return res

#time: o(n)
#memory: o(1)
```

**Mnemonic**
We have two people on the opposite side of a hallway. They each must run to the other side of the hallway without hitting each other. They cannot pass each other. As they are about to seemingly collide, it turns out that one of them is harry potter and apparates right behind the other person. Due to the apparation, harry potter has ran slightly less distance than the other person. 

**Visual** 
![[IMG_9B664122F331-1.jpeg]]

#review 


