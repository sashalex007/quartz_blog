---
date: 2024-10-02
---
**Link:** https://leetcode.com/problems/search-a-2d-matrix-ii/
#### Solution:

**Topics**: [[binary search]], [[divide and conquer]]

**Intuition**
This problem really twisted my brain. I knew there was a way to efficiently traverse the matrix with a divide and conquer strategy, however I could not figure it out. What I missed is that the correct traversal that elegantly handles all the edge cases is starting from the **top right** corner. 

Basically, the idea is to use a process of elimination. If the value in the top right is greater than target, we can eliminate that column, so we decrement the `col`, otherwise we increment row. Thats it. 

**Implementation**
```python
def search_mat2(matrix, target):
	n, m = len(matrix), len(matrix[0])
	row, col = 0, m-1
	while row != -1 and row != n and col != -1 and col != m:
		if matrix[row][col] == target:
			return True
		elif matrix[row][col] > target:
			col -= 1
		else:
			row += 1
	return False

#time: o(nlogn)
#memory: o(1)
```

**Visual** 
![[IMG_4514A4E66766-1.jpeg]]

**Review 1**
Remembered the trick! Very tricky to come up with though. Starting at row 0 in rightmost position is not something natural. I will label this as niche.

**Review 2**
Cool problem. Remembered the trick. I think the code above is overly complicated though. Here is a better implementation:

```python
def search_matrix(matrix, target):
	row = 0
	col = len(matrix[0])-1
	while row < len(matrix):
		if matrix[row][col] == target:
			return True
		elif matrix[row][col] < target or col == 0:
			row += 1
		else:
			col -= 1
	return False
```

#review 
#hard 
#niche 
