---
date: 2024-07-03
---
**Link:** https://leetcode.com/problems/maximum-profit-in-job-scheduling/
#### Solution:

**Topics**: [[DP]], [[binary search]], [[heap]]

**Intuition**
We can imagine this problem as asking for the maximum profit from all the possible non-overlapping sequences of jobs. The first thing that comes to mind is DP because we cannot greedily choose to take or not take a specific job, as that would require full knowledge of all jobs for each decision (which is an n^2 operation). DP will allow us to efficiently explore the possibility tree, and maximize the profit.

The code almost writes itself in this case since we know that this is a classic take/skip pattern. However we can make a key optimization in the "take" branch, since we don't have to explore `i+1`, but rather the next job that can be started. We can use binary search to find the next job (or hit the base case if no such job exists).

**Implementation (DP + BS)** 
```python
def max_profit(startTime, endTime, profit):
	jobs = [(s, e, p) for s, e, p in zip(startTime, endTime, profit)]
	jobs.sort()

	def bs(index):
		l = index + 1
		r = len(jobs) - 1
		next_job = len(jobs)
		while l <= r:
			mid = (l + r) // 2
			if jobs[mid][0] >= jobs[index][1]:
				next_job = mid
				r = mid - 1
			else:
				l = mid + 1
		return next_job
		
	@cache
	def dfs(i):
		if i == len(jobs):
			return 0
		take = jobs[i][2] + dfs(bs(i))
		skip = dfs(i+1)
		return max(take, skip)

	return dfs(0)

#time: o(nlogn)
#memory: o(n)
```

There is also a very interesting heap solution which is also more space efficient (and slightly more time efficient). The idea simulate starting each jobs with the maximum profit that has been seen so far. In other words, every job started gets added to a min heap with the profit from that job, plus the max profit that has been popped off the heap. In some sense, this is similar to space-optimized bottom-up DP. 

**Implementation (heap)**
```python
def max_profit(startTime, endTime, profit):
	jobs = [(s, e, p) for s, e, p in zip(startTime, endTime, profit)]
	jobs.sort()
	res = 0
	min_heap = []
	max_profit = 0
	
	for start, end, profit in jobs:
		while min_heap and min_heap[0][0] <= start:
			_, p = heappop(min_heap)
			max_profit = max(max_profit, p)
		res = max(res, profit + max_profit)
		heappush(min_heap, (end, profit + max_profit))

	return res	
	
#time: o(nlogn)
#memory: o(n)
```

**Mnemonic**
You are given a list of jobs that can only be done in a fixed timeframe. You take one job and complete it. From this list, jump to the next job that you can take (where the start time is greater or equal to the current time). 

**Visual** 
![[IMG_FC88E56BB277-1.jpeg]]

#review 


