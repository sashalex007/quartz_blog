---
date: 2024-08-10
---
**Link:** https://leetcode.com/problems/lru-cache/
#### Solution: 

**Topics**: [[linked list]], [[hash map]]

**Intuition**
This is not a difficult problem, but the implementation is extremely annoying. Basically, we need `o(1)` removals and insertions. The only data structure that supports this are doubly linked lists. We use a hash map to keep pointers to nodes so we don't have to traverse the whole list for `get` calls. 

The implementation is minefield of edge cases, but there is way to make it more manageable. Initialize the linked list with a dummy head and dummy tail (and connect them). This removes so many edge case because now we we can handle removal or insertion of any node the same way! More specifically, each node inserted is guaranteed not to be the head or the tail...we interact with the list by inserting new nodes (most recent) into `head.next` and removing LRU nodes by grabbing `tail.prev`. 

Also, its highly useful to define methods `add` and `remove`. 

**Implementation**
```python
class Node:
	def __init__(self, key, value):
		self.key = key
		self.value = value
		self.next = None
		self.prev = None

class LRUCache:
	def __init__(self, capacity):
		self.capacity = capacity
		self.nodes = {}
		self.head = Node(-1, -1)
		self.tail = Node(-1, -1)
		self.head.next = self.tail
		self.tail.prev = self.head

	def add(self, node):
		first = self.head.next
		node.next = first
		first.prev = node
		node.prev = self.head
		self.head.next = node
			
	def remove(self, node):
		before = node.prev
		after = node.next
		before.next = after
		after.prev = before
		
	def get(self, key):
		if key not in self.nodes:
			return -1
		node = self.nodes[key]
		self.remove(node)
		self.add(node)
		return node.value

	def put(self, key, value):
		if key in self.nodes:
			node = self.nodes[key]
			node.value = value
			self.remove(node)
			self.add(node)
			return
		if self.capacity == 0:
			del self.nodes[self.tail.prev.key]
			self.remove(self.tail.prev)
			self.capacity += 1
		node = Node(key, value)
		self.add(node)
		self.nodes[key] = node
		self.capacity -= 1

#time:
#memory:
```

**Mnemonic**
You have a measuring calliper. As you put more marbles in a line between the callipers, the callipers must spread. If remove all marbles, the callipers arms are touching each other. The arms represent the dummy nodes.

**Visual** 
![[IMG_808CB246B8D1-1.jpeg]]

**Review 1**
The two dummy nodes implementation is amazing....use it. Remember to implement add/remove methods.

#review 
#OOP 


