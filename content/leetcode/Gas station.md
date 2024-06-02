---
date: 2024-06-02
---
**Link:** https://leetcode.com/problems/gas-station/
#### Solution:

**Topics**: [[greedy]], [[sliding window]], [[simulation]]

**Intuition**
This is a pretty tricky problem, but we can essentially simulate the outcome using a few key assumptions. 

It is natural to simulate this problem with a gas tank. `gas_tank += gas[i] - cost[i] `

If `gas_tank < 0` at the current index, we can't move to the next station, so reset `gas_tank` to `0`, and set `potential_start` to `i+1`. 

The notable edge case is if the cost of the round trip exceeds the gas available...in which case its not possible to make the round trip. Return `-1`.

**Implementation**
```python
def gas_station(cost, gas):
	if sum(cost) > sum(gas): #handle edge case
		return -1
		
	gas_tank = 0
	potential_start = 0
	for i in range(len(gas)):
		gas_tank += gas[i] - cost[i]
		if gas_tank < 0:
			gas_tank = 0
			potential_start = i + 1
	return potential_start

#time: o(n)
#memory: o(1)
```

**Mnemonic**
Drive car to gas station until tank empty (negative), then walk to next station and get a new car to continue the journey.

**Visual** 
![[IMG_0D0BA680D763-1.jpeg]]

#review 
#hard 


