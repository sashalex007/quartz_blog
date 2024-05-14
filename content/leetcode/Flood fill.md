
**Link:** https://leetcode.com/problems/flood-fill/
#### Solution:

**Topics**: [[graph]], [[DFS]], [[BFS]]

**Intuition**
Very simple graph traversal problem. Either DFS or BFS works here...BFS is slightly more efficient so lets use that. The idea is to traverse the component of connected colours and mark them each with the new colour...we can implement this with in-place cycle detection. 

The one edge case to consider is if the start node is already the right colour...in this case we just return image...otherwise this causes an infinite cycle.

**Implementation**
```python
def flood_fill(image, sr, sc, color):
	if image[sr][sc] == color:
		return image
		
	target = image[sr][sc]
	queue = deque([(sr, sc)])
	while queue:
		row, col = queue.popleft()
		if row == -1 or row == len(image):
			continue
		if col == -1 or col == len(image[0]):
			continue
		if image[row][col] != target:
			continue
		image[row][col] = color
		delta = [(1, 0), (0, 1), (-1, 0), (0, -1)]
		for i, j in delta:
			queue.append(row+i, col+j)
	return image
			

#time:o(m*n)
#memory:o(m*n) worst case queue size
```

**Visual** 
![[IMG_695BA027055E-1.jpeg]]

#review 


