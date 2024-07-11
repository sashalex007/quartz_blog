---
date: 2024-07-11
---
**Link:** https://leetcode.com/problems/network-delay-time/
#### Solution:

**Topics**: [[BFS]], [[Dijkstra's]]

**Intuition**
This is a classic weighted graph problem with a slight twist. The problem asks for a the minimum time to reach all nodes, so naturally this would be the max value in the `times` hash map after minimum times to reach every node has been discovered. This  can be done with either an optimized [[BFS]] or [[Dijkstra's]] algorithm. An adjacency list is required for either one.

**Implementation (BFS)**
```python
def delay_time(times, n, k):
	adj = {node:[] for node in range(1, n+1)}
	for node1, node2, time in times:
		adj[node1].append((node2, time))
	times = {}
	queue = deque([(k, 0)])
	while queue:
		node, time = queue.popleft()
		if node in times and times[node] <= time:
			continue
		times[node] = time
		for neighbor, time_to in adj[node]:
			queue.append((neighbor, time + time_to))
			
	if len(times) != n:
		return -1
	return max(times.values())

#time: o(e*n) number of edges times number of nodes
#memory: o(n*n)
```

**Implementation (Dijkstra's)**
```python
def delay_time(times, n, k):
	adj = {node:[] for node in range(1, n+1)}
	for node1, node2, time in times:
		adj[node1].append((node2, time))
		
	times = {node:float('inf') for node in range(1, n+1)}
	visited = set()
	queue = [(0, k)]
	while queue:
		time, node = heappop(queue)
		visited.add(node)
		for neighbor, time_to in adj[node]:
			new_time = time + time_to
			if new_time < times[neighbor]:
				times[neighbor] = new_time
				heappush(queue, (new_time, neighbor))
	if len(visited) != n:
		return -1
	return max(times.values())

#time: o(elogn)
#memory: o(n)
```

**Mnemonic**
See [[Cheapest flights within k stops]] mnemonic

**Visual** 
See [[Cheapest flights within k stops]] visual

#review 


