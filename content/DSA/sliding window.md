
**DSA:** [[subarray]]

**Intuition**
Grow and shrink the window based on some condition. Often paired with a [[hash map]].

**Implementation**
```python
#general structure of sliding win

array = [1, 2, 3, 4]
state_of_the_window = {}
l = 0
for r in range(len(array)):
	curr = array[r]
	state_of_the_window[curr] = state_of_the_window.get(curr, 0) + 1

	while some_condition_true:
		state_of_the_window[array[l]] -= 1
		l -= 1
```

**Visual** 
![[IMG_70DB4EF8CC9D-1.jpeg]]

