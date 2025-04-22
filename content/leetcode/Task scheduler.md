---
date: 2024-11-05
---
**Link:** https://leetcode.com/problems/task-scheduler
#### Solution:

**Topics**: [[heap]]

**Intuition**
Really tricky heap problem! It was  more the implementation that I struggled with versus the algorithm. It was instantly clear to me that we can use heap here much in the same way as [[Rearrange string k distance apart]]! The tricky part here is understanding how to increment the result! 

In order to optimally arrange the tasks, we must pop `n+1` tasks off the heap at a time, same as in [[Rearrange string k distance apart]]. Here is the difference though: in [[Rearrange string k distance apart]], if we cannot rearrange the string, we simply exit and return `''`. In this problem we have to **continue**, but we incur a cost of when an optimal arrangement cannot be found. This basically takes [[Rearrange string k distance apart]] and flips it on it's head. 

Essentially, we continue the algorithm until the heap is empty, and incur costs as we go along. So what is the cost? Well, if we can pop exactly `n+1` elements off the heap, this guarantees that no same element will be less than `n+1` apart, thus the cost of each is exactly 1. However, if while trying to pop of `n+1` elements, we run out of elements to pop off, then we **must** idle for the entire time remaining in the cycle! The exception to this is if there is nothing left to process...in which case we just take the number of tasks processed instead of `n+1`.

**Implementation**
```python
def task_sched(tasks, n):
	freq = {}
	for t in tasks:
		freq[t] = freq.get(t, 0) + 1
	max_heap = []
	for count in freq.values():
		heappush(max_heap, -count)
		
	time = 0
	while max_heap:
		put_back = []
		processed = 0
		cycle = n+1
		while cycle > 0:
			if not max_heap:
				break
			count = heappop(max_heap)
			if count < - 1:
				put_back.append(count+1)
			processed += 1
			cycle -= 1
			
		while put_back:
			heappush(max_heap, put_back.pop())
			
		time += n+1 if max_heap else processed
	return time

#time: o(n) #because the heap is at most 26 long, o(log(26)) == o(1)
#memory: o(26) = o(1)
```

I'm tagging this niche. You would rarely use a heap in this way.

**Review 1**
Tricky little problem! Took a few minutes to figure this one out. The above implementation is kind of confusing and unintuitive. Its better to just pop off the heap `n+1` times while incrementing `cycles` and simply return `cycles` if the heap is empty AND the there are no tasks to put back in the heap! This insures that we don't over count `cycles`. The above implementation accomplishes the same thing but with two spurious variables `time, processed`. 

**Implementation (cleaner)**
```python
def leastInterval(tasks, n):
	freq = {}
	for t in tasks:
		freq[t] = freq.get(t, 0) + 1	
	max_heap = []
	for task, count in freq.items():	
		heappush(max_heap, (-count, task))
	
	cycles = 0
	while max_heap:
		popped = []
		for _ in range(n+1):
			cycles += 1
			if max_heap:			
				count, task = heappop(max_heap)
			if count + 1 < 0:
				popped.append((count+1, task))
			if not popped and not max_heap:  #key condition
				return cycles
		
		for count, task in popped:		
			heappush(max_heap, (count, task))
	
	return cycles
```

#review 
#hard 
#niche 

