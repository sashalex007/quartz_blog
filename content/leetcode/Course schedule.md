---
date: 2024-05-15
---
**Link:** https://leetcode.com/problems/course-schedule/
#### Solution:

**DSA**: [[DFS]], [[topological order]], [[Course schedule II]]

**Intuition**
Classic topological order problem. Perform a topological traversal with a cycle detection. If a cycle is detected anywhere, the courses cannot be completed...return False.

The idea is with topological order is that each node recursively visits it's dependencies (children) before visiting itself. 

**Implementation**
```python
def course_schedule(num_courses, prerequisites):
	adj = {i:[] for i in range(num_courses)}
	for course, prereq in prerequisities:
		adj[course].append(prereq)

	def dfs(node, visiting, visited):
		if node in visiting:
			return False
		if node in visited:
			return True
		visiting.add(node)
		for neighbor in adj[node]:
			if not dfs(neighbor, visiting, visited):
				return False
		visiting.remove(node)
		visited.add(node)
		return True

	visiting = set()
	visited = set()
	for course in range(num_courses):
		if not dfs(course, visiting, visited):
			return False
	return True

#time: O(v+e) v=vertices ,e=edges
#memory: O(v+e) 
```

**Visual** 
same as [[Course schedule II]]

#review 


