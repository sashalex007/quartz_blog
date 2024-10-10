---
date: 2024-05-15
---
**Link:** https://leetcode.com/problems/find-the-town-judge/
#### Solution:

**Topics**: [[graph]], [[in/out degree]]

**Intuition**
This problem is rated easy but the most efficient solution is actually pretty subtle. I first solved this with an adjacency list and sets. The subtle solution centres around counting directed connections. The town judge should have `n-1` incoming connections (trusted by everyone except himself), and exactly zero outgoing connections (trusts no one). 

One way to implement this is keeping the counts of incoming and outgoing connections in two arrays...the town judge would then be the person where `incoming[person] == n-1` and `outgoing[person] == 0`. 

We can do something a bit more clever though using only one array. We can treat the connections as a score, decrementing from it each time the person trusts someone and incrementing it when a person gains someones trust. The judge's score should then be `n-1` because he would have gained everyones trust (score incremented n-1 times) , and trusted no one (score never decremented).

The implementation for this connection counting approach is far simpler and more efficient than using sets or an adjacency list. 

**Implementation**
```python
def town_judge(n, trust):
	scores = [0]*(n+1)
	for a, b in trust:
		scores[a] -= 1
		scores[b] += 1
	for i in range(1, len(scores)):
		if scores[i] == n-1:
			return i
	return -1
		
#time: o(len(trust))
#memory: o(n)
```

**Visual** 
![[IMG_5BA46E20BCAB-1.jpeg]]

**Review 1**
Didn't fall into the adjacency list trip this time around. Immediately figured our the [[in/out degree]] pattern combining them into a score. 

If we are making a `scores` array of length `n+1` for compatibility with 1-indexed labels, then make sure to start iterating from index 1 when checking for the answer because in some cases the 0 in the first index causes false positives. 

#review 


