---
date: 2024-11-08
---
**Link:** https://leetcode.com/problems/analyze-user-website-visit-pattern/
#### Solution:

**Topics**: [[hash map]]

**Intuition**
Fun little problem! Not very challenging, but it did take me a minute to understand what the problem statement really meant with respect to the result. Basically we must sort by timestamp and split the data by user. Then we generate all unique triplets of websites for each user...increment a count for each new triplet found. Return the lexicographically smallest triplet with the max score. 

The hardest part about this problem is accepting that `n^3` is optimal here.

**Implementation**
```python
def user_pattern(username, timestamp, website):
	by_user = {}
	for t, u, w in sorted(zip(timestamp, username, website)):
		if u not in by_user:
			by_user[u] = []
		by_user[u].append((w))
		
	triplets = {}
	for websites in by_user.values():
		seen = set()
		for i in range(len(websites)-2):
			for j in range(i+1, len(websites)-1):
				for k in range(j+1, len(websites)):
					trip = (websites[i], websites[j], websites[k])
					if trip not in seen:
						triplets[trip] = triplets.get(trip, 0) + 1
						seen.add(trip)
	res = []
	max_score = max(triplets.values())
	for trip, count in triplets.items():
		if count == max_score:
			res.append(trip)
	return min(res)

#time: o(n*n*n)
#memory: o(n*n*n)
```

#review 


