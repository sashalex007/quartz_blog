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

**Review 1**
Same as [[Course schedule II]], but lets take a moment to look at the time/space complexity. It does seem like the time complexity should be `o(V)`  where `V` is the number of nodes, and since our DFS can visit a node only once (because of the visited set), the complexity is seemingly `o(V)`...however a subtle point is that even if a child has been visited, we still iterate through the connections in order to examine them. This accounts for `o(E)` complexity. Thus the the time complexity is `o(V+E)`. 

#review 


