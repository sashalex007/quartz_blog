---
date: 2024-11-12
---
**Link:** https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/
#### Solution:

**Topics**: [[BFS]]

**Intuition**
Simple little problem, obvious [[BFS]]. Whats not super obvious is what is the best way to reverse the levels. I decide to reverse the odd rows after the fact...this is quite clean and still `o(n)`. Using a deque is also possible, but we have to convent the deque's back into lists so its arguable slower than just reversing every second row at the end. Deque solution is kind of more interesting though, so that's the one I will implement.

**Implementation**
```python
def zigzag_level(root):
	if root is None:
		return []
	res = []
	queue = deque([(root, 0)])
	while queue:
		node, level = queue.popleft()
		if len(res) == level:
			res.append(deque())
		if len(res) % 2 == 0:
			res[-1].appendleft(node.val)
		else:
			res[-1].append(node.val)
		if node.left:
			queue.append((node.left, level+1))
		if node.right:
			queue.append((node.right, level+1))
	return [list(q) for q in res]
	
#time: o(n)
#memory: o(n)
```

#review 


