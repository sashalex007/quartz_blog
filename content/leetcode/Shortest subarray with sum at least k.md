---
date: "2025-05-16"
---
**Link:** https://leetcode.com/problems/shortest-subarray-with-sum-at-least-k/
#### Solution:

**Topics**: [[heap]]

**Intuition**

Totally stumped by this problem, but the heap solution is actually quite approachable. Sliding window does not work here because of the presence of negatives. Why is this the case?

```
nums = [2, -1, 1, 3] k = 4

suppose we decide to shrink the window while sum >= k and update the result. 

[2, -1, 1, 3] sum = 2
 l
 r
 
[2, -1, 1, 3] sum = 1
 l   
     r
     
[2, -1, 1, 3] sum = 2
 l   
        r
        
[2, -1, 1, 3] sum = 5     the sum is now >= k, so our provisional result is 4
 l   
           r

[2, -1, 1, 3] sum = 3    the sum is now < k so the window no longer moves
     l   
           r

HOWEVER we can see that [1,3] is in fact the shortest subarray! 
```

So how do we get around this problem? Well sliding windows only work when the array has a monotonic property! The negatives break this property because the cumulative sum can increase AND decrease!

```
nums = [1,2,0,5]
prefix_sum  = [1,3,3,8] #nums is positive so monotonicity is maintained

nums = [1,2,3,-2,3]
prefix_sum = [1,3,5,3,6] #nums has a negative so monotonicity is broken!
                    * broken here!
```

So we must search for a different technique. This is where heap comes in. Basically, when we reach a sum >= k, we know for a fact that we have a valid subarray...but since cumulative sum is non-monotonic, we don't know if the current subarray is the shortest possible one! So what do we do? We can **subtract** previously seen subarray sums! Lets go back to the first example:

```
nums = [2, -1, 1, 3] k = 4

prefix_sums = [2, 1, 2, 5]
                        * when we get to 5, we know that 5 >= k so this is a                               valid subarray, but not nececcarily the shortest one!


Lets start subtracting previously seen subarray sums to see if we can still have sum >= k

[2, 1, 2, 5]  sum = 5-2 = 3
 #        *
 
[2, 1, 2, 5]  sum = 5-1 = 4
    #     *  

[2, 1, 2, 5]  sum = 5-2 = 3
       #  *  

We can see that the only valid subtraction that still results in the sum meeting the constraint >= k is when we subtract the cumulative sum at index 2! (5-1).

So this is a valid strategy, but this approach in n^2 since we are iterating over all previously seen sums. 

But one key observation we can make is that we are only concerned concerned with the subtracting the sums that meek the constraint current-prev >= k! And therefore it makes sense that we would start from the SMALLEST SUMS! 

You can guess where this is going. We keep a min heap with the tuple (sum, index) and pop off the heap while current-heap[0][0] >= k. We don't have to revist the popped sums because as current sum moves forward through the array, by definition any valid arrays made with the previously popped sums would be LARGER! 
```


**Implementation**
```python
def shortestsub(nums, k):
	res = float('inf')
	min_heap = []
	curr_sum = 0
	for i in range(len(nums)):
		curr_sum += nums[i]
		if curr_sum >= k:
			res = min(res, i+1)
		while min_heap and curr_sum - min_heap[0][0] >= k:
			_, index = heappop(min_heap)
			res = min(res, i - index)
		heappush(min_heap, (curr_sum, i))
	return res if res != float('inf') else -1

#time: o(nlogn)
#memory: o(n)
```

There is also a queue solution but It's a bit beyond me. Revisit it upon revision. 

#hard 
#review 


