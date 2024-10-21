---
date: 2024-06-13
---
**Link:** https://leetcode.com/problems/find-all-people-with-secret/
#### Solution:

**Topics**: [[BFS]], [[union find]]

**Intuition**
Interesting problem that appears a bit simpler than it actually is. On first glance, you might come to the conclusion that you can iterate over each meeting in ascending order (time), and add people to a set of those with the secret. This does not work because of a simple edge case which arrises from how the question is formulated. There can be multiple meetings occurring simultaneously, and the secret is shared instantaneously. 

What this means is that if person X receives the secret in one meeting, that secret is shared instantly to all meetings (if any) that person X is simultaneously also attending. So naively, whenever a secret is shared to a new person X, you would have to check all other meetings that person X is simultaneously attending to share that secret...and recursively for each person Y that receives the secret from X and so on. This is an `o(n**2)` operation. 

To solve this more efficiently, we can just build an adjacency list for meetings occurring at the same time and run a traversal starting from every person that already knows the secret. This is a two pass linear solution but still much better than quadratic. [[BFS]] is simplest to implement here. 

**Implementation**
```python
def people_with_secret(n, meetings, firstPerson):
	meetings.sort(key=lambda x: x[2])
	grouped_meetings = groupby(meetings, key=lambda x: x[2])
	knows_secret = set([0, firstPerson])

	for _, meetings in grouped_meetings:
		adj = {}
		queue = set()
		for x, y, _ in meetings:
			if x not in adj:
				adj[x] = []
			if y not in adj:
				adj[y] = []
			adj[x].append(y)
			adj[y].append(x)
			if x in knows_secret:
				queue.add(x)
			if y in knows_secret:
				queue.add(y)
				
		queue = deque(queue)
		while queue:
			person = queue.popleft()
			for neighbor in adj[person]:
				if neighbor not in knows_secret:
					knows_secret.add(neighbor)
					queue.append(neighbor)
					
	return list(knows_secret)
			
#time: o(mlogm) m = number of meetings
#memory: o(n) in the worst case, all meetings on same day
```

**Mnemonic**
You are in a room with everyone you are meeting with first thing in the morning. You have a secret and you tell it to the person next to you loudly. Instantly everyone in the room knows the secret. The day goes on and those who were in the room with you proceed, throughout the day, to more rooms in the building and spread the secret in the same way...and so on. 

**Visual** 
![[IMG_63C8336A2FD1-1.jpeg]]

**Review 1**
Logical problem, quite straight forward. The key here is understanding that meetings that are happening at the same time must be processed together. And IMO solutions 1-3 are absurdly dumb. Solution 4 is basically what I did but with a DFS for the search (it makes no difference). 

#review 


