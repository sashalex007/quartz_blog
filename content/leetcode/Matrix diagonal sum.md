---
date: 2024-07-16
---
**Link:** https://leetcode.com/problems/matrix-diagonal-sum/
#### Solution:

**Topics**: [[math]]

**Intuition**
Really simple problem but its worth discussing the most optimal way to solve it. Initially what I did was set the elements in the diagonal to 0 after having added them to the result (such that no element is added twice when adding the anti-diagonal elements). While this works, its a foolish approach because there can only be one intersection between the primary and secondary diagonals...and ONLY if the size of the matrix is odd...and ONLY at the centre element. 

For example:
```
1 2 3  matrix is odd, there is a collision at (1,1) value 5 
4 5 6
7 8 9

1 2    matrix is even, there is no collision. 
3 4

```

**Implementation**
```python
def diag_sum(mat):
	n = len(mat)
	res = 0
	for i in range(n):
		res += mat[i][i]
		res += mat[i][n-1-i]
	if n % 2 != 0:
		res -= mat[n//2][n//2]
	return res

#time: o(n)
#memory: o(1)
```

**Mnemonic**
You are playing tic-tac-toe, then you decide to play 4-square. You notice that there is no middle element on the 4-square surface. 

**Visual** 
![[IMG_8FAC1F4E4BB8-1.jpeg]]

#review 


