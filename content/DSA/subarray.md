---
date: 2024-05-13
---

**DSA:** [[sliding window]]

**Intuition**
For a list of size n, you can form a total of `(n*(n+1))/2` subarrays. For each new element added to a subarray, we can form exactly n more subarrays. 

**Implementation**
```python
#Brute force find all subarrays

array = [1, 2, 3, 4]
for i in range(len(array)):
	for j in range(i+1, len(array)+1)
		unique_subarray = array[i:j]
```

**Visual** 
![[IMG_C1EE05B37398-1.jpeg]]


