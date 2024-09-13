---
date: 2024-05-15
---
**Link:** https://leetcode.com/problems/candy/
#### Solution:

**Topics**: [[greedy]], [[scan]]

**Intuition**
Very nice problem utilizing a greedy forwards/backwards scan pattern. I don't really have an intuition for this problem other than recognizing that the starting point is giving every child one candy and then iteratively meeting the constraints, first in a forward pass and then in a backwards pass (being careful not to ruin the work done on the forward pass).

**Implementation**
```python
def candy(ratings):
	candies = [1]*len(ratings)
	for i in range(1, len(ratings)):
		if ratings[i] > ratings[i-1]:
			candies[i] = candies[i-1] + 1 
	for i in range(len(ratings)-2, -1, -1):
		if ratings[i] > ratings[i+1] and candies[i] <= candies[i+1]:
			candies[i] = candies[i+1] + 1
	return sum(candies)
		
#time: o(n)
#memory: o(n)
```

**Visual** 
![[IMG_025C319D64C9-1.jpeg]]

#review 


