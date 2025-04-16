---
date: 2024-09-20
---
**Link:** https://leetcode.com/problems/random-pick-with-weight/
#### Solution:

**Topics**: [[binary search]]

**Intuition**
I never cease to be amazed with the use cases of [[binary search]]. This problem is a masterpiece...the insight is so simple yet so subtle and difficult to come up with. 

The naive approach of course is to full up a list with indices appearing `w[i]` number of times, then do `randint` on that list. The problem is that `sum(w)` can be extremely large (`10^20` in the case of this problem). Obviously we don't want to hold a list of length `sum(w)` in memory...so what do we do?

There is actually a way to simulate that hypothetical array with another array of length `len(w)`! How?

Consider the following weights:
```
[1, 1, 5] 

We can see that most of the probablity density is at index 2. 

Our hypothetical array is as follows:

[0, 1, 2, 2, 2, 2, 2]

What if we took a running sum of [1, 1, 5]? We get:

[1, 2, 7]

How does this help...well for one it's sorted so we can search...

But search for what?

We know the maximum index in the hypothetical array is sum(w), so what if we searched for a random float between 0 and sum(w)!
```

Lets think about the above approach: take the running sum and then search for a random float between 0 and sum(w):

```
original = [1, 1, 5]
running_sum = [1, 2, 7]
target = 0-7 #random float

Each float between 0 and 7 is equally likely to be selected. Lets look at the ranges and see where the binary search lands (bisect_left):

target |  running_sum, i
------------------------
0-1    |  1, 0
1-2    |  2, 1
2-7    |  7, 2

Take a look at range of numbers that will match each index! Index 2 gets captured by much wider range of numbers than the two others! And this is exactly what one would expect for the original probability density. 

Essentially, when a random target between 2 (exclusive) and 7 (inclusive) is chosen, the leftmost binary search will map that target to index 2. 

For indices 0 and 1, only numbers within the range 0-1 and 1-2 respectively will map onto the respective indices. 
```


**Implementation**
```python

def __init__(self, w: List[int]):
	self.sums = w
	for i in range(1, len(self.sums)):
		self.sums[i] += self.sums[i-1]

def pickIndex(self) -> int:
	target = random.random()*self.sums[-1]
	l = 0
	r = len(self.sums)
	while l < r:
		mid = (l + r) // 2
		if self.sums[mid] < target:
			l = mid + 1
		else:
			r = mid
	return l

#time: o(logn)
#memory: o(1)
```

**Review 1**
This one kicked my ass again, but I got very close to the solution. Basically my idea was create a new array of tuples `(weight, index)` and sort it. Then binary search for a random number between 0 and the max weight. This actually almost works but it has a very subtle flaw. 

The problem arises when we get duplicate weights! For example:
```
suppose a weight array..
w = [1, 1, 1, 1]

No matter what random value we choose from, it will always be between 0 and 1. No matter what that number is, if we search for it in this array, we always get index 0 if we use a leftmost search or index 5 if a rightmost search!

So doing it like this takes away from the scope of the search. 
```

We must transform `w` in a way that allows us to search through all the possibilities. Prefix sum! If we transform `w` into a prefix sum, this ensures all elements are unique because `w` must be greater than 0! Actually an interesting side note is that if weights were permitted to be 0, you would get the same effect as in the above example because there would be duplicate values in the prefix sums array so the algorithm would still work as expected (cool!). 

**Review 2**
Must have remembered this one subconsciously because I solved it almost instantly.

#review 
#hard 


