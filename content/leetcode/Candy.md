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

**Review 1**
Crushed this one. The forward pass is logical but the backward pass is interesting. In the backwards pass its important to recognize that we only make a modification if `ratings[i] > ratings[i+1]` **and** `candies[i] <= candies[i+1]`. This is because we don't want to ruin the work we have done in the forward pass. Its perfectly possible that the rating is greater but we are already meeting the requirements. 

#review 


