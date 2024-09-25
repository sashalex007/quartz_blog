---
date: 2024-09-25
---
**Link:** https://leetcode.com/problems/check-if-two-chessboard-squares-have-the-same-color/
#### Solution:

**Topics**: [[N-queens]]

**Intuition**
They key here is realizing that all white squares and all black squares exist on diagonals. We can remember from [[N-queens]], that diagonals and anti diagonals can have an integer representation in terms of row and col:

```
diagonal = row+col
anti_diagonal = row-col
```

The first step is to represent the squares as positions on a 8x8 matrix (1-indexed for simplicity):

```
8
7
6
5
4
3
2
1
  a  b  c  d  e  f  g  h


8                      b
7                   b
6                b
5             b
4          b
3       b
2    b
1 b
  1  2  3  4  5  6  7  8

this anti-diagonal of black squares is row-col=0


8                      b
7                   b  w
6                b  w
5             b  w
4          b  w
3       b  w
2    b  w
1 b  w
  1  2  3  4  5  6  7  8

the next anti-diagonal of white squares is row-col = 1


8                      b
7                   b  w
6                b  w  b
5             b  w  b
4          b  w  b
3       b  w  b
2    b  w  b
1 b  w  b
  1  2  3  4  5  6  7  8

the next anti-diagonal of black squares is row-col = 2


8                      b
7                   b  w
6                b  w  b
5             b  w  b  w
4          b  w  b  w
3       b  w  b  w
2    b  w  b  w
1 b  w  b  w
  1  2  3  4  5  6  7  8

the next anti-diagonal of white squares is row-col = 3


we start seeing a pattern...
```

We can conclude that all **odd** anti-diagonals are black, and all **even** anti-diagonals are white!
So all that remains is to compute the anti-diagonal for each square and return true if both are even or if both are odd!

**Implementation**
```python
def same_color(coordinate1, coordinate2):
	def color(pos):
		x = ord(pos[0]) - ord('a') + 1
		y = int(pos[1])
		return (x - y) % 2 == 0
	return color(coordinate1) == color(coordinate2)

#time: o(1)
#memory: o(1)
```

#review 


