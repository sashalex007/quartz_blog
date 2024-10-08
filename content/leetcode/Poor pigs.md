---
date: 2024-05-15
---
**Link:** https://leetcode.com/problems/poor-pigs/
#### Solution:

**Topics**: [[math]], [[qubit]]

**Intuition**
Really weird problem, but the iterative approach kind of makes sense. I will improve this editorial upon future revisions.

The key insight seems to be the fact that in one round of testing, `n` pigs can test `2**n` buckets. In two rounds of testing, `n` pigs can test `3**n` buckets. Or more generally, `(rounds+1)**n`. Its a bit unclear to me why exactly this is the case, but I'm going to trust it for now and improve on this editorial later. This seems to be an encoding problem.

```
rounds = 1
states: [dead, alive] (2**num_pigs)

rounds = 2
states: [dead_in_rd1, dead_in_rd2, alive] (3**num_pigs)

rounds = 3
states: [dead_in_rd1, dead_in_rd2, dead_in_rd3, alive] (4**num_pigs)
```

We are given `minutesToDie` and `minutesToTest`, so we can compute how many complete rounds we have for testing. 

```python
rounds = minutesToTest // minutesToDie
```

Now its simply a matter of increasing the amount of pigs in the formula `(rounds+1)**pigs` until the result is greater or equal to the number of buckets provided to test.

**Implementation**
```python
def poor_pigs(minutesToTest, minutesToDie, buckets):
	rounds = minutesToTest // minutesToDie
	pigs = 0
	while (rounds+1)**pigs < buckets:
		pigs += 1
	return pigs

#time: o(log(buckets))
#memory: o(1)
```

Instead of the while loop, we can also solve mathematically.

![[IMG_76D5FD81D46A-1.jpeg]]
```python
def poor_pigs(minutesToTest, minutesToDie, buckets):
	rounds = minutesToTest // minutesToDie
	return ceil(log2(buckets) / log2(rounds+1))
	
#time: o(1)
#memory: o(1)
```

**Visual** 

![[IMG_64E13D06D309-1.jpeg]]

visuals from this solution https://leetcode.com/problems/poor-pigs/solutions/935172/two-diagrams-to-help-understanding/
![[546342db-390a-4e5e-adf9-d124abec0b74_1605349509.07897.png]]
![[bafa63d4-1dae-4ef5-8b81-67eb85fafd86_1605349693.3704822.png]]

**Review 1**
Just remember that 1 pig can test 2 buckets (lives or dies) in one round of testing...likewise 2 pigs can test `2**2` buckets...or `2**n` more generally. So we keep increasing `n` until we reach or exceed buckets. If more tests are permitted (`minutesToTest//minutesToDie`) we increase the base. 

#review 
#hard 

