---
date: 2024-09-01
---
**Link:** https://leetcode.com/problems/peak-index-in-a-mountain-array/
#### Solution:

**Topics**: [[binary search]], [[Find in mountain array]]

**Intuition**
This is a nice little binary search problem. The key idea here is that the stopping condition is if `mid[i-1] < mid[i] > mid[i+1]`. If we are in an increasing portion of the array, we can shift the left pointer, if decreasing then shift the right. 

There is one notable edge case though, which is if the peak is at `arr[1]` or `arr[-2]`. This case is problematic because we could miss the peak by allowing the `mid` to go into outside the of range. 

For example:
```
arr = [0,5,4,3,2]

1. the first mid is index 2 with value 4. We see that it is in the decreasing portion so we shift the right pointer to l=0, r=1

2. With l=0 and r=1, the new mid is simply 0, which means we have missed the 5. 
```

We could mess around with the binary search like doing `r = mid` instead to `r = mid+1`, but this looks horrible and there is a much simpler way to do it. 

Observe that indices `0, -1` can **never**, by definition, be the peak. So all we have to do is search the correct range!  We can do this by initializing `l=1 and r = len(arr)-2`. This way our pointer can never skip the peak, because we are not searching indices that can never be the peak.  

**Implementation**
```python
def peak(arr):
	l = 1
	r = len(arr)-2
	while l <= r:
		mid = (l + r) // 2
		if arr[mid-1] < arr[mid] > arr[mid+1]:
			return mid
		elif arr[mid-1] < arr[mid]:
			l = mid + 1
		else:
			r = mid - 1

#time: o(logn)
#memory: o(1)
```

#review 


