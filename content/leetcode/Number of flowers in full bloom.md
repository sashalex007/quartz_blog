---
date: 2024-07-16
---
**Link:** https://leetcode.com/problems/number-of-flowers-in-full-bloom/
#### Solution:

**Topics**: [[heap]], [[sorted order]]

**Intuition**
This is a really cool problem requiring some unorthodox use of min heap. There are several ways to use heap in this problem and all but one results in a decent time complexity. As with most interval problems related to heap, we are iterating over something and pushing or popping from the heap on each iteration (if conditions are met). The pushing and popping conditions are often trivial and inconsequential (for example popping ended events, pushing started ones), but what is highly consequential is what we choose to iterate over. 

In some simpler heap problems, it is often acceptable to iterate over the each unit of time...so the start time to the end time and everything in between (an increment of 1 typically). Whether or not the problem can be solved like this is wholly dependant upon the constraints...if the upper bound of time is not too high...say `10**5`, then its ok. But if the upper bound is for example `10**9` then we can't accept linear complexity (in addition to logarithmic popping). In cases such as this, we must choose something more clever to iterate over. 

For this problem, the only logical choice is to iterate over `people` and set up the right conditions to push and pop flowers off the heap. A more naive approach is to iterate over each possible unit of time and if a person shows up at this particular unit of time, we can updated the result by taking the size of the heap (the size of the heap represents the current flowers in full bloom). Of course this would work if not for the fact that the upper bound for time is `10**9`, and so much unnecessary processing would be done as the problem is concerning only specific time frames when people show up rather than every potential time frame. 

By choosing to iterate over only the slices of time we are concerned with (times that people show up), we can be drastically more efficient...decreasing our `n` from `10**9` to `10**5` (max length of `flowers` plus max length of `people`). 

The popping condition is simply if events have ended. The pushing condition is slightly trickier...we keep a pointer to `flowers` and while the start time is smaller than the current time, we add the end time of the flower to the heap and increment the pointer.

**Implementation**
```python
def bloom_flowers(flowers, people):
	res = [0]*len(people)
	people = [(time, i) for i, time in enumerate(people)]
	people.sort()
	flowers.sort()
	min_heap = []
	
	i = 0
	for time, index in people:
		while i < len(flowers) and flowers[i][0] <= time:
			heappush(min_heap, flowers[i][1])
			i += 1
		while min_heap and min_heap[0] < time:
			heappop(min_heap)
		res[index] = len(min_heap)
		
	return res
		

#time: o(nlogn)
#memory:o(n)
```

**Mnemonic**
There is a pile (heap) of flowers. People come at different times to add freshly picked flowers to the heap and remove the wilted ones. 

**Visual** 
![[IMG_43587F8244B5-1.jpeg]]

**Review 1**
Pretty much solved this instantly. Forgot to sort `people` though. The result array should be returned in the same order as the original ordering of `people`, so make sure to save the indices before sorting.

#review 


