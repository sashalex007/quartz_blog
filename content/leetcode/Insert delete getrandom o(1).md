---
date: 2024-11-11
---
**Link:** https://leetcode.com/problems/insert-delete-getrandom-o1/
#### Solution:

**Topics**: [[hash map]], [[in-place]]

**Intuition**
Great problem! I initially came up with an `nlogn` solution using a `SortedSet`, but the optimal `o(1)` solution is very clever. I could have figured it out but I was pretty convinced that my `SortedSet` solution was good enough so I didn't push it. After reading the editorial, I regretted not taking this problem more seriously. 

The concept is very simple: Keep a hash map that stores the indices of all elements added to a list. When it comes time to remove an element, index into it using the hash map and **swap it** with the last element in the list. Update the hash map and pop off the list! 

So simple, but kind of subtle! Very nice [[in-place]] problem. 

**Implementation**
```python
class RandomizedSet:
	
	def __init__(self):  
		self.indices = {}
		self.vals = []
		
	def insert(self, val: int) -> bool:
		if val in self.indices:
			return False
		self.vals.append(val)
		self.indices[val] = len(self.vals)-1
		return True
	
	def remove(self, val: int) -> bool:
		if val not in self.indices:
			return False
		val_index = self.indices[val]
		self.vals[val_index], self.vals[-1] = self.vals[-1], self.vals[val_index]
		self.indices[self.vals[val_index]] = val_index
		self.indices.pop(val)
		self.vals.pop()
		return True
	
	def getRandom(self) -> int:
		ran_index = random.randint(0, len(self.vals)-1)
		return self.vals[ran_index]

#time: o(n) #average
#memory: o(n)
```

#review 


