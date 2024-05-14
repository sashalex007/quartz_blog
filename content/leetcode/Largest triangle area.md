
**Link:** https://leetcode.com/problems/largest-triangle-area/
#### Solution:

**DSA**: [[math]]

**Intuition**
Not really much to this problem. Just try all points with a triple for loop with the formula for calculating area with coordinates:  
`area = abs(0.5*(x1*(y2-y3)+ x2*(y3-y1) + x3*(y1-y2))`

**Implementation**
```python
def largest_triangle(points):
	res = 0
	for i in range(len(points)):
		for j in range(i+1, len(points)):
			for k in range(j+1, len(points)):
				x1, y1 = points[i]
				x2, y2 = points[j]
				x3, y3 = points[k]
				area = abs(0.5*(x1*(y2-y3) + x2*(y3-y1) + x3*(y1-y2)))
				res = max(res, area)
	return res
```

**Visual** 
![[blog/leetcode/_pics/IMG_FD404D043358-1.jpeg]]

![[IMG_5B817006572E-1.jpeg]]
#review 


