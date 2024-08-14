---
date: 2024-08-12
---
**Link:** https://leetcode.com/problems/lfu-cache/
#### Solution:

**Topics**: [[linked list]], [[hash map]], [[SortedList]], [[LRUcache]]

**Intuition**
This is a great problem and a very nice twist on the [[LRUcache]] problem. Basically, we must remove the least frequently used element and in the case of a tie, we remove the least recent. 

The key is to store nodes in their own doubly linked lists by frequency...that way when we must remove the least frequent, we just key into the smallest count and then remove the tail of that list (because the tail would be the least recently used). 

There is one slight complication for the `get` method. We must remove the node from its current list and insert it into the `count+1` list. Its also useful to delete empty lists as the number of lists can get very high. 

The `put` method is slightly tricky...we have a hash map of lists that are keyed by frequency, so ho do we get the least frequent key? Well one way would be to take the min of the keys, but this is not the most efficient operation. `SortedDict` is very useful here, because its essentially a hash map sorted by key (red-black tree)  and we will be able to always access the least frequent (key, value) using the `peakitem(0)` method. 

The implementation is not too bad if we use the lessons learned from [[LRUcache]]. Algorithmically, cache policies are not terribly interesting but the implementation is definitely a useful exercise in OOP (especially this one). 

**Implementation**
```python
class Node:
	def __init__(self, key, value):
		self.key = key
		self.value = value
		self.count = 1
		self.prev = None
		self.Next = None
		
class LL:
	def __init__(self):
		self.head = Node(-1, -1)
		self.tail = Node(-1, -1)
		self.head.next = self.tail
		self.tail.prev = self.head
		self.empty = True
		
	def add(self, node):
		first = self.head.next
		node.next = first
		first.prev = node
		self.head.next = node
		node.prev = self.head
		self.empty = False
	
	def remove(self, node):
		before = node.prev
		after = node.next
		before.next = after
		after.prev = before
		if self.head.next = self.tail:
			self.empty = True

from sortedcontainers import SortedDict
class LFUCache:
	def __init__(self, capacity):
		self.capacity = capacity
		self.nodes = {}
		self.lists = SortedDict()

	def add(self, node):
		if node.count not in self.lists:
			self.lists[node.count] = LL()
		linkedlist = self.lists[node.count]
		linkedlist.add(node)

	def remove(self, node):
		linkedlist = self.lists[node.count]
		linkedlist.remove(node)
		if linkedlist.empty:
			del self.lists[node.count]

	def get(self, key):
		if key not in self.nodes:
			return -1
		node = self.nodes[key]
		linkedlist = self.lists[node.count]
		self.remove(node)
		node.count += 1
		self.add(node)
		return node.value

	def put(self, key, value):
		if key in self.nodes:
			node = self.nodes[key]
			node.value = value
			self.remove(node)
			node.count += 1
			self.add(node)
			return
		if self.capacity == 0:
			linkedlist = self.lists.peakitem(0)[1]
			node = linkedlist.tail.prev
			self.remove(node)
			del self.nodes[node.key]
			self.capacity += 1
		node = Node(key, value)
		self.add(node)
		self.nodes[key] = node
		self.capacity -= 1
		
#time: o(n)
#memory: o(n)
```

**Mnemonic**
Imagine pieces of string hanging from another piece of string. 

**Visual** 
![[IMG_A039EA7AD3C2-1.jpeg]]

#review 
#hard 


