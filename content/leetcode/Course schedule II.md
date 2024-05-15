---
date: 2024-05-15
---
**Link:** https://leetcode.com/problems/course-schedule-ii/
#### Solution:

**DSA**: [[graph]], [[topological order]], [[DFS]]

**Intuition**
This problem is a classic topological ordering. Its made slightly more complicated by the fact that not all of the courses my be in the list of prerequisites. A course with no prerequisites can automatically be taken, but there is no need for special handling. 

Just make sure to add every course to the adjacency list, because there is no guarantee that it will be inside the prerequisites list. And make sure to include cycle detection, if there is a cycle, return and empty array.

For example:
```python
num_courses = 5
prerequsites = []

result = [0, 1, 2, 3, 4] #or any ordering for that matter because if there are no prerequisites, then any course can be taken at any time. Hence why the promblem statement asked for ANY ordering, because there are many. 
```

**Implementation**
```python
def topo_order(num_courses, prerequisites):
	adj = {i:[] for i in range(num_courses)}
	for course, prereq in prerequisites:
		adj[course].append(prereq)

	res = []
	def dfs(node, visited, visiting):
		if node in visiting:
			return False
		if node in visited:
			return True

		visiting.add(node)
		for neighbor in adj[node]:
			if not dfs(neighbor, visited, visiting):
				return False
		visiting.remove(node)
		visited.add(node)
		res.append(node)

	visited = set()
	visiting = set()
	for course in range(num_courses):
		if not dfs(course, visited, visiting):
			return []
	return res

#NOTE: the reason why it does not matter which course we start from is because no matter where we start, all of its children get added to to res. For example, if we randomly manage to start at the last possible course, then all prerequisite courses would get added in one single traversal. If not, then the nodes and children that we do see again, go into visited and we have a base-case that prohbits appending previously seen nodes to the result. 
```

**Visual** 
![[IMG_45776302B72B-1.jpeg]]

#review 


