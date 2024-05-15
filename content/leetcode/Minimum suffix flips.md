---
date: 2024-05-15
---
**Link:** https://leetcode.com/problems/minimum-suffix-flips/
#### Solution:

**Topics**: [[greedy]]

**Intuition**
This is kind of an annoying problem that is way less complicated than it appears on first glance. The idea is to track the status of the remaining bits in our created string (we don't actually have to create the string). When the status of the current bit in `s` differs from the current bit in `target`, we make a flip and update the status of the remaining bits in `s`.

For example:
```
00000 #s 
10111 #target
At index 0, the status of s is 0, target is 1. We flip

11111 #s 
10111 #target
At index 1, the status of s is 1, target is 0. We flip

10000 #s 
10111 #target
At index 2, the status of s is 1, target is 0. We flip

10111 #s 
10111 #target

s == target, 3 flips were made. At no point were we required to sore more than the current status of s.
```

**Implementation**
```python
def min_flips(target):
	flips = 0
	s_status = '0'
	for bit in target:
		if s_status != bit:
			flips += 1
			s_status = bit
	return flips

#time: o(n)
#memory: o(1)
```

**Visual** 

![[IMG_F2C620CC03BA-1.jpeg]]


#review 


