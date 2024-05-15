---
date: 2024-05-13
---

**DSA:** [[subarray]], [[monotonic stack]]

**Intuition**
If something in the future could have impact on the present, potentially use a stack.

For example in the [[Valid parentheses]] problem, a current `(` may be closed by a future `)`, but we don't know if or when that would happen. For example in `()` the first open parentheses is closed immediately, but in `(((((())))))`, the first open parentheses is closed at the end, and in `(((((`, the first parentheses is never closed.

Another intuition is deleting/collapsing/squeezing subarrays if that looks like its relevant to the problem. for example here `( ()() )` we can squeeze out `()()` to get `( squeezed was here )`. The squeezing pattern is visually intuitive. 

The stack is useful when we think about problems where we have to connect non-contiguous subarrays.

**Implementation**
```python
def valid_parentheses(s):
	stack = []
	for char in s:
		if char == '(':
			stack.append('(')
		else:
			if stack:
				stack.pop()
			else:
				return False
				
	return len(stack) == 0
```

**Visual** 
![[IMG_9C0E86307947-1.jpeg]]
![[IMG_5909DDA0B4A9-1 2.jpeg]]
