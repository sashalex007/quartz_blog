---
date: 2024-05-13
---

**Intuition**
1. finding the shortest path
2. we should consider this for any problem with branching possibilities (along with DFS)
3. for trees, this is a level order traversal
4. for graphs, there will be cycles so create a visited set

Implementation

```python
#add visited if we expect a cycle
visited = set()
queue = deque([(start_state, level)])
while queue:
	state, level = queue.popleft()
	if state == what_we_are_looking_for:
		return level
		
	if state in visited:
		continue
	visited.add(state)
	next_state = get_next_state(state)
	queue.append((next_state, level + 1))

return -1 #not found

```

**Visual**

![[IMG_937A4EBCED21-1.jpeg]]
![[IMG_AEF7CA8C8C7A-1.jpeg]]