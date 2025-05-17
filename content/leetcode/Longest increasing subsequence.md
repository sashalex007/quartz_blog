---
date: "2025-05-17"
---
**Link:** https://leetcode.com/problems/longest-increasing-subsequence/
#### Solution:

**Topics**: [[binary search]], [[DP]]

**Intuition**
Very interesting problem that I have been avoiding! The DP approach is quite simple but the complexity is `o(n*n)` because we need to keep track of `prev`, so the recursive call is `dfs(prev, i)`. For this problem, the memoized version is actually too slow, but fortunately there is a very nice `o(nlogn)` solution based on binary search. How?

Basically, we build the subsequence gradually, and leverage its sorted order to keep updating it. 

```
nums = [10,9,2,5,3,7,101,18]
sub = [] #subsequence is empty

[10,9,2,5,3,7,101,18]
 *
sub = [10] 

[10,9,2,5,3,7,101,18]
    *
sub = [9] #10 is greater than 9, so we swap it out! 

[10,9,2,5,3,7,101,18]
      *
sub = [2] #9 is greater than 2, so we swap it out! 

[10,9,2,5,3,7,101,18]
        *
sub = [2,5] #add 5

[10,9,2,5,3,7,101,18]
          *
sub = [2,3] #5 is greater than 3 so we spap it

[10,9,2,5,3,7,101,18]
            *
sub = [2,3,7] #add 7! 

[10,9,2,5,3,7,101,18]
               *
sub = [2,3,7,101] #add 101!

[10,9,2,5,3,7,101,18]
                  *
sub = [2,3,7,18] #swap 101!
```

Notice that we can binary search `sub` for the insert position! It's important to note that while this algorithm works to get the length, the actual longest subsequence is not necessarily `sub` at the end of the algorithm...but the length will be accurate. If we wanted the actual subsequence, not just the length I think we would need the `n*n` DP approach. 

**Implementation**
```python
def lis(nums):
	sub = []
	for num in nums:
		i = bisect_left(sub, num)
		if i == len(sub):
			sub.append(num)
		else:
			sub[i] = num
	return len(sub)

#time: o(nlogn)
#memory: o(n)
```

#hard 
#review 


