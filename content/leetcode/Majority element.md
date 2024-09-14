---
date: 2024-09-14
---
**Link:** https://leetcode.com/problems/majority-element/
#### Solution:

**Topics**: [[hash map]], [[Boyer-Moore voting]]

**Intuition**
The hash map counting solution is quite trivial but alternatively this problem is a great intro into the [[Boyer-Moore voting]] algorithm. 

The intuition behind this algorithm is a little bit strange. I like to call it "sticky", because the algorithm works in such a way that the most frequent element will end up sticking to the assigned variable. 

Basically the way it works is we have two variables: `count` and `candidate`. When `count == 0`, we select a new candidate. When `curr == candidate` we increment count, otherwise we decrement count. At the end of the algorithm, the majority element will be  `candidate`. 

Why does this work? Basically, the frequency of the majority element will eventually win out over other candidates and over time it will "stick" as the `candidate`. Or another way to say it is that the majority element always "survives" the voting process. 

See here:

![](https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Boyer-Moore_MJRTY.svg/300px-Boyer-Moore_MJRTY.svg.png)
 
Note that this **only** works for the majority element, NOT the most frequent. Furthermore a second pass is required to verify if the candidate indeed occurred more than `n/2` times. For this problem we are guaranteed a majority element, so we can skip the second pass. 

**Implementation**
```python
def maj_element(nums):
	count = 0
	cand = None
	for num in nums:
		if num == cand:
			count += 1
		elif count == 0:
			cand = num
			count = 1
		else:
			count -= 1
	return cand

#time: o(n)
#memory: o(1)
```

**Mnemonic**
Imagine a political election where each voter can either support the current candidate or oppose them. The majority candidate will always have more supporters than opponents, so they'll be the last one standing even if their support drops to zero at times.

#review 



