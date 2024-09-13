---
date: 2024-09-12
---
**Link:** https://leetcode.com/problems/find-eventual-safe-states/
#### Solution:

**Topics**: [[topological order]]

**Intuition**
Very nice topological order problem. This one took me a couple attempts before finding an efficient enough solution, although I had the right idea from the start.  

The key idea is basically to do a cycle detection on each node. If there exists a cycle starting at that node, it is not a safe node. We can use a classic visiting/visited pattern here. 

**Implementation**
```python
def safe_states(graph):
	def cycle(node, visiting, visited):
		if node in visiting:
			return True
		if node in visited:
			return False

		visiting.add(node)
		for child in graph[node]:
			if cycle(child, visiting, visited):
				return True
		visiting.remove(node)
		visited.add(node)
		return False

	res = []
	visiting = set()
	visited = set()
	for node in range(len(graph)):
		if not cycle(node, visiting, visited):
			res.append(node)
	return res

#time: o(nm)
#memory: o(nm)
```


#review 


