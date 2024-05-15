---
date: 2024-05-15
---
**Link:** https://leetcode.com/problems/heaters/
#### Solution:

**Topics**: [[binary search]], [[greedy]], [[sorted order]]

**Intuition**
There are two approaches to this problem. There is a semi-linear greedy solution and a binary search solution. We will go over the binary search solution first.

The right way to look at this problem is understanding that each house has a heater that is closest to it. The result will thus be `max(abs(house[i]-nearest_heater))` ...or in other words the maximum distance away between a house and it's nearest heater. We can recruit binary search to find the nearest heater for each house!

**Implementation**
```python
def heaters(heaters, houses):
	heaters.sort()
	def bs(house):
		l = 0
		r = len(heaters) - 1
		nearest_heater = float('inf')
		while l <= r:
			mid = (l + r) // 2
			if abs(heaters[mid]-house) < abs(nearest_heater-house):
				nearest_heater = heaters[mid]
				
			if heaters[mid] <= house:
				l = mid + 1
			else:
				r = mid - 1
		return abs(nearest_heater-house)

	res = 0
	for house in houses:
		res = max(res, bs(house))
	return res

#time: o(nlog(m)) n = len(houses), m = len(heaters)
#memory: o(1)
```

**Greedy method**
The greedy method is tricky, but the key insight is that we can greedily move along houses and heaters if we sort them both. The idea is to iterate through houses and move the heaters pointer while the distance between the current heater and the current house is greater or equal to the distance between the current house and the next heater. 

With this strategy we can find the nearest heater greedily for each house. This does not help the complexity much as we have to sort houses and heaters, but nevertheless its a clever and interesting solution. 

**Implementation**
```python
def heaters(houses, heaters):
	houses.sort()
	heaters.sort()
	res = 0
	i = 0
	for house in houses:
		while (i < len(heaters)-1 and 
			abs(heaters[i]-house) >= abs(heaters[i+1]-house)):
			i += 1
		res = max(res, abs(heaters[i]-house))
	return res

#time: o(nlog(n)) n = max(len(houses), len(heaters))
#memory: o(1)
```

**Visual** 
![[IMG_BA78A5AAF7A0-1.jpeg]]


#review 
#hard 


