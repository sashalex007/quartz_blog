---
date: 2024-06-03
---
**Link:** https://leetcode.com/problems/cheapest-flights-within-k-stops/
#### Solution:

**Topics**: [[BFS]], [[Dijkstra's]]

**Intuition**
The optimized BFS solution is quite clear to me, but the modified [[Dijkstra's]] far less so. In any case, I'll include both implementations and will devote more attention to [[Dijkstra's]] on future revisions.

It's hard to imagine that this problem is anything other and optimized BFS or [[Dijkstra's]] because we are dealing with a weighted graph here (the weights are flight costs). Optimized BFS comes to mind, as we can revisit nodes opportunistically should the running cost be lower than what's in our cache. 

**Implementation (BFS)**
```python
def cheapest_flights(n, flights, src, dst, k):
	adj = {city:[] for city in range(n)}
	for from_city, to_city, price in flights:
		adj[from_city].append((to_city, price))

	res = -1
	costs = {}
	queue = deque([(src, 0, 0)])
	while queue:
		city, flights, cost = queue.popleft()
		if flights > k + 1:
			continue
		if city in costs and cost >= costs[city]:
			continue
		costs[city] = cost
		if city == dst:
			res = cost

		for to_city, price in adj[city]:
			queue.append((to_city, flights+1, cost + price))
	return res
			

#time: o(e*k) because we could traverse each edge maximum K times
#memory: o(e*k) hold all e*k traversals in the queue
```

The [[Dijkstra's]] approach is way less clear to me and its actually a bit less efficient than the above (at least according to the leetcode editorial). The idea is to greedily explore the lowest cost path, and proactively prune explorations BEFORE they enter the queue (heap in the case of [[Dijkstra's]]). If either the cost is lower than the cached cost or the number of stops is lower than the cached number of stops...we allow the exploration.

**Implementation (dijkstra's)**
```python
def cheapest_flights(n, flights, src, dst, k):
	adj = {city:[] for city in range(n)}
	for from_city, to_city, price in flights:
		adj[from_city].append((to_city, price))
	stops = {city: float('inf') for city in range(n)}
	costs = {city: float('inf') for city in range(n)}
	stops[src] = 0
	costs[src] = 0

	min_heap = [(0, 0, src)]
	while min_heap:
		cost, flights, city = heappop(min_heap)
		if flights > k + 1:
			continue
		if city == dst:
			return cost

		for to_city, price in adj[city]:
			new_cost = cost + price
  			if flights + 1 < stops[to_city] or new_cost < costs[to_city]:
	  			stops[to_city] = flights + 1
	  			costs[to_city] = new_cost
				heappush(min_heap, (new_cost, flights + 1, to_city))
	return -1
```

**Mnemonic**
At airport. Clone myself to take every available flight to every possible city...but first call all my clones (or siblings?!) and ask if we had already been to that city (if yes, get the cost), and only create a new clone to go to that city if I get there at less cost. 

**Visual** 
![[IMG_D6C767571B84-1.jpeg]]

#review 


