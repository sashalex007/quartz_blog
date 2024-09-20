---
date: 2024-09-20
---
**Link:** https://leetcode.com/problems/minimum-time-difference/
#### Solution:

**Topics**: [[intervals]], [[math]]

**Intuition**
This is a cool little problem. Right away it should be clear that we can (and should) convert `HH:MM` to minutes. By doing this, we get a single value for time that exists in the range `1-(24*60)`. 

Now we can simply sort the converted list and return the minimum difference between neighbours. 

There is one notable edge case. Clock time is circular, so it's important that we also check the the time difference between the first and last times in our sorted list. Why?

Fox example:
```
['00:00', '23:59']
[0, 1439]          #converted to minutes

We know that the two time points are 1 second apart, but if we compare the times we get a difference of 1439. 

We need a different way of comparing the time difference between the first and last element. 
```

The minutes in a day exist on a continuous number line between `1-(24*60)`, so lets construct an representative number line with two time points:

```
------------------
  ^            ^   #time points

What is the time difference between these points?

------------------
  ^ ~~~~~~~~~~ ^  

Its the in between time...but also...

------------------
~~^            ^~~  

The time outside!

between_time = time2-time1
outside_time = time1 + (24*60)-time2

Since we only need to check the time difference between first and last once, we use the outside_time formula at the end. 
```

**Implementation**
```python
def min_time_diff(timePoints)
	times = [int(t[:2])*60 + int(t[3:]) for t in timePoints]
	times.sort()
	min_time = float('inf')
	for i in range(1, len(times)):
		min_time = min(min_time, times[i]-times[i-1])
	min_time = min(min_time, times[0]+(60*24-times[-1]))
	return min_time

#time: o(nlogn)
#memory: o(n)
```

**Visual** 
![[IMG_B3C699589624-1.jpeg]]

#review 


