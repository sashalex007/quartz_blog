
**Link:** https://leetcode.com/problems/rotate-image/
#### Solution:

**Topics**: [[math]]

**Intuition**
Mathematically, a 90 degree matrix rotation is just a transposition followed by a reflection. 

A transpose is just swapping `matrix[row][col]` with `matrix[col][row]`...but the loop must be constructed carefully because if every node is visited and swapped, the end result would be the original matrix (the swap would occur twice). So we much traverse the array such that we only visit a single triangular half:

```
matrix:
0  1  2
3  4  5
6  7  8

path: 
0         #this path ensures the swap only occurs once
3  4  
6  7  8
```

The reflection is straight forward, but keep in mind that its a vertical reflection so we must reverse the columns in each row but the relative ordering of the rows remains unchanged.

**Implementation**
```python
def rotate_image(matrix):
	for r in range(len(matrix)):
		for c in range(r+1):
			matrix[r][c], matrix[c][r] = matrix[c][r], matrix[r][c]
	for row in range(len(matrix)):
		l, r = 0, len(matrix)-1
		while l < r:
			matrix[row][l], matrix[row][r] = matrix[row][r], matrix[row][l]
			l += 1
			r -= 1
			
#time: o(n**2) #for n*n matrix
#memory: o(1)
```

**Visual** 
![[IMG_E8294CBEC88D-1.jpeg]]

#review 


