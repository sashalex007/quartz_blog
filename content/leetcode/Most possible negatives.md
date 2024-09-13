---
date: 2024-08-06
---
**Link:** https://leetcode.com/discuss/interview-question/4997933/Amazon-OA
#### Solution:

**Topics**: [[heap]]

**Intuition**
See code comments. Quite a tricky heap problem.

**Implementation**
```python
import heapq
def most_negatives(pl):
    curr_sum = pl[0] # the first element can never be negative,
                     # so we always take it 
    max_heap = []
    for i in range(1, len(pl)):
        curr_sum -= pl[i] # try to make every element negative
        heapq.heappush(max_heap, -pl[i]) # push it to the max heap...
                                         # this represents the elements
                                         # we have made negative
        while curr_sum < 0:
            curr_sum += -(heapq.heappop(max_heap)*2)
            # while the cumulative sum is negative, pop off the max heap
            # and add it back to the cumulative sum.  
            # (x2 because we subtracted it earlier)
            
            # I hope it is clear why a max heap is used...
            
            # when curr_sum drops into negatives, we want to add back the
            # largest values first to get our curr_sum back to positive as
            # quickly as possible.
            
            # this ensures that our heap can grow as large as possible
            # (remember, the heap represents the elements that have been
            # made negative)
    return len(max_heap)

#time: o(nlogn)
#memory: o(n)
```

#review 
#OA
#hard 

