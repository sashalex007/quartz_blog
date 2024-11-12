---
date: 2024-11-12
---
**Link:** https://leetcode.com/problems/daily-temperatures/
#### Solution:

**Topics**: [[monotonic stack]]

**Intuition**
Easy problem. Simple monotonic decreasing stack. Keep a tuple `(temp, index)` on the stack. While the current temperature exceeds the top of the stack, pop off and update the result of the popped index to `current_index-popped_index`. Too easy honestly. 

**Implementation**
```python
def daily_temps(temperatures):
	res = [0] * len(temperatures)
	stack = []
	for i, t in enumerate(temperatures):
		while stack and t > stack[-1][0]:
			_, j = stack.pop()
			res[j] = i - j
		stack.append((t, i))
	return res

#time: o(n)
#memory: o(n)
```

#review 


