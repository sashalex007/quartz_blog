---
date: 2024-09-11
---
**Link:** https://leetcode.com/problems/set-matrix-zeroes/
#### Solution:

**Topics**: [[in-place]]

**Intuition**
The easy way to solve this is to create two sets, one for rows and another for columns, and pass over the matrix while adding integer positions to their respective sets. Then we can pass over the matrix again and if the row or column exists in the set, we change the value to 0. 

The more interesting (and very annoying) way is to do this in-place. The idea is to use the first indices of rows and cols as a flag to store the state of the row or column. There are three major edge cases to handle if we do it this way. 

1. If we use use the first indices, we will have an overlap at position `(0, 0)`, so we will keep an outside variable to store the state of the first column (or row, whichever is chosen). 
2. Since we can't overwrite the first column and row, we have to iterate exclusively:

```
1  1  1  1 
1  1  1  1 
1  1  1  1
1  1  1  1

X  X  X  X
X  1  1  1 
X  1  1  1
X  1  1  1

X = Flag
```

3. The consequence of no.2 is that if either the first row or column contained a 0, we must handle that outside of the nested loop. 

**Implementation**
```python
def set_zeros(matrix):
	n = len(matrix)
	m = len(matrix[0])
	
	is_col = False
	for row in range(n):
		if matrix[row][0] == 0:
			is_col = True
		for col in range(1, m):
			if matrix[row][col] == 0:
				matrix[0][col] = 0
				matrix[row][0] = 0

	for row in range(1, n):
		for col in range(1, m):
			if matrix[row][0] == 0 or matrix[0][col] == 0:
				matrix[row][col] = 0

	if matrix[0][0] == 0:
		for col in range(m):
			matrix[0][col] = 0

	if is_col:
		for row in range(n):
			matrix[row][0] = 0
				
#time: o(n*m)
#memory: o(1)
```

**Visual** 
![[IMG_514717C48ED1-1.jpeg]]


#review 


