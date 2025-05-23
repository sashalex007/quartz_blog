---
date: "2025-05-22"
---
**Link:** https://leetcode.com/problems/trapping-rain-water-ii
#### Solution:

**Topics**: [[Trapping rain water]], [[heap]], [[BFS]]

**Intuition**
Insane problem! Admittedly I had to look at the solution because I was not able to come up with an efficient enough approach. My mistake was not considering the **simplest possible case**. So what is the simplest possible case?

```
1 1 1
1 0 1 
1 1 1 
```
![[IMG_F32A2D1050E8-1.jpeg]]

We can see that the outer walls form a boundary and inside the boundary there is an empty space...so if we keep identifying the boundary, then by definition anything inside the boundary that is lower than the boundary itself, is a place that water can be trapped! 

However it is still not clear **how** we build the boundary. In the above case its obvious because the boundary is uniformly the same height...so lets look at a more interesting case:

```
2 2 2
2 0 2
2 1 2
  ^
```

Here, the height 1 at position (2,1) forms a lower wall than the rest of the boundary...this is important because the trapped water inside the boundary CANNOT exceed it as it would flow out. The answer is [[heap]]! 

The idea is to start the boundary as the outermost walls, and visit the the nodes adjacent to the **smallest height in the current boundary**. If a node adjacent to the smallest boundary height is **lower** than the smallest boundary height, then it is **guaranteed** that water can be trapped there. Add the adjacent node to the current boundary (if water is filled, update it) and continue while there are nodes in the boundary. Keep a visited set (or in-place cycle avoidance).

Essentially the idea here is to **dynamically update the current boundary** while keeping track of the trapped water. 

**Implementation**
```python
def trap(heightMap):
	boundary = []
	for col in range(len(heightMap[0])):
		heappush(boundary, (heightMap[0][col], 0, col))
		heappush(boundary, (heightMap[-1][col], len(heightMap)-1, col))
		heightMap[0][col] = -1
		heightMap[-1][col] = -1
	for row in range(1, len(heightMap)-1):
		heappush(boundary, (heightMap[row][0], row, 0))
		heappush(boundary, (heightMap[row][-1], row, len(heightMap[0])-1))
		heightMap[row][0] = -1
		heightMap[row][-1] = -1

	res = 0
	while boundary:
		h, row, col = heappop(boundary)
		for x, y in ((1,0),(-1,0),(0,1),(0,-1)):
			n_row = row + x
			n_col = col + y
			if n_row == -1 or n_row == len(heightMap):
				continue
			if n_col == -1 or n_col == len(heightMap[0]):
				continue
			if heightMap[n_row][n_col] == -1:
				continue
			if heightMap[n_row][n_col] < h:
				res += h - heightMap[n_row][n_col]
			
			heappush(boundary, (max(h, heightMap[n_row][n_col]), n_row, n_col))
			heightMap[n_row][n_col] = -1
	return res
		

#time: (n*m)log(n*m)
#memory: n*m
```

#hard 
#insane 
#review 


