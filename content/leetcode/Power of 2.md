
**Link:** https://leetcode.com/problems/power-of-two/
#### Solution:

**Topics**: [[bitwise]], [[Pseudo palindromic paths in a binary tree]]

**Intuition**
This is a bitwise problem using the `&` operator, see [[Pseudo palindromic paths in a binary tree]] for a detailed explanation on it

**Implementation**
```python
def is_power(n):
	if n == 0:
		return False
	return n & (-n) == n

#time: o(1)
#memory: o(1)
```

**Visual** 
![[blog/leetcode/_pics/IMG_40DC14274F22-1.jpeg]]

#review 


