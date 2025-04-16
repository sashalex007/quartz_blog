---
date: 2024-11-09
---
**Link:** https://leetcode.com/problems/plates-between-candles/
#### Solution:

**Topics**: [[prefix sums]], [[Next greater element II]]

**Intuition**
Kind of a tricky problem. Implementation is the trickiest part...absolutely riddled with edge cases! Essentially we need three arrays `left, right, counts`. In the `left` array we store the nearest candle index from the left, in the `right` array the nearest candle from the left, and our counts array is a prefix sum of the number of candles seen so far at every index. We need all three of these to solve the problem. Why?

Consider:
```
s = '**|**|**|**'  query = [0, 10]
     ^         ^ 

The first query index in the query is 1, so we need the closest candle to the right of it (2). 

The second query index is 10, so we need the closest candle to the left of it (8).

Problem solved? NO!

We need to also know how many candles are inside the substring because they won't count towards the result!

Lets look at the helper arrays:

s =    '* * | * * | * * | * *'
left = [x,x,2,2,2,5,5,5,8,8,8]
right= [2,2,2,5,5,5,8,8,8,x,x]
sums = [0,0,1,1,1,2,2,2,3,3,3]

query = [0, 10]

l = 2
r = 8
l_sum = 1
r_sum = 3

We have everything needed to compute the result:

length = 8-2-1 = 5         # -1 because we want the in-between length
candles = 3-1-1 = 1        # -1 because we don't want to count the boundary
plates = length - candles = 4
```

The implementation is a minefield because of the potential for off by one errors. Just remember that the in-between length is not `r-l`, it is `r-l-1`. The former is exclusive of `l` but inclusive of `r`. We need exclusive of both `r` and `l`, so we decrement by 1.

In the case of the prefix sums its the same thing. `sums[r]-sums[l]` is inclusive of `r`, so we should decrement by 1....this will give an accurate count of the candles in-between. 

Another edge case to consider. Take a look above at the `left` and `right` arrays. Notice that all indices prior to the first candle don't have a result (denoted `x`). If either or both elements of the query have no result in their respective arrays, it means that there are no plates in this range bounded by candles, so the result for that query should be `0`. How do we handle this edge case? Pretty simple, we can just set the non-result to `-1` and check if either are greater than `0`. 

Thats it for edge cases right??? Incorrect. There is one more subtle edge-case. Well it's not that subtle, but the absurdity of this implementation may have caused you to miss it. 

Consider:
```
s = '|****|' query = [1, 4]
      ^  ^
     r    l
     
The left boundary candle index for the first query index is 5. 

The right boundary candle index for the second query index is 0. 

The ranges cross and nullify the in-between substring, so when leftboundary >= rightboundary, the result for the query is also zero.
```

To handle this case we can of course directly check if `r <= l`...or we can compute the in-between length and if that length is negative, the result is zero. 

Did I say thats the last edge case??? Just kidding, it is- now feast your eyes on this code:

**Implementation**
```python
def plates_candles(s, queries):
	sums = [0] * len(s)
	right_boundaries = [-1] * len(s)
	left_boundaries = [-1] * len(s)
	
	curr_sum = 0
	curr_candle = -1
	for i in range(len(s)):
		if s[i] == '|':
			curr_sum += 1
			curr_candle = i
		sums[i] = curr_sum
		right_boundaries[i] = curr_candle
		
	curr_candle = -1
	for i in range(len(s)-1, -1, -1):
		if s[i] == '|':
			curr_candle = i
		left_boundaries[i] = curr_candle

	res = []
	for a, b in queries:
		left_boundary = left_boundaries[a]
		right_boundary = right_boundaries[b]
		plates = right_boundary - left_boundary - 1 #length
		if plates <= 0 or left_boundary < 0 or right_boundary < 0:
			res.append(0)
			continue
		plates -= sums[right_boundary] - sums[left_boundary] - 1 #candle count
		res.append(plates)
	return res

#time: o(n)
#memory: o(n)
```

**Review 1**
Fun little problem. Solved with a monotonic stack...essentially the same solution as the above. Almost missed the fact that we need  the candle count! Got caught on a dumb edge case. 

#review 
#hard 

