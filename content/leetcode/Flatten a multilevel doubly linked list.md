---
date: 2024-07-18
---
**Link:** https://leetcode.com/problems/flatten-a-multilevel-doubly-linked-list/
#### Solution:

**Topics**: [[recursion]], [[linked list]]

**Intuition**
It should be instantly clear that the solution is recursive because of the multi-level data structure. For example, a child node can have nodes that it is connected to that themselves have children...so its clear that however we flatten the list, we should do it recursively. 

The main idea is to recursively traverse the list and when we encounter a child, return the last node in its own contextual list. When we have the last node, we can stitch the list back together, and set the child attribute to `None`. This sounds simple but the implementation is littered with edge cases. 

The best approach is to prohibit reaching `None` in the recursive call stack, by returning `curr_node` when `curr_node.next is None`. Why? Because if we want to flatten the list, like mentioned before we need the last contextual node for each child. Returning `curr_node` when there is no `next` attribute is doing exactly that...this is the end node. If, however, we allow returning `None`, the code gets bloated fast because then we need to keep track of the parent and so on. 

Of course this approach introduces the edge case if `head is None` to start with, but handling this up front is a small price to pay. 

**Implementation**
```python
def flatten_list(head)
	if head is None:
		return head
		
	def flatten(node):
		if node.child:
			temp = node.next
			node.next = node.child
			node.child.prev = node
			last = flatten(node.child)
			node.child = node
			if temp:
				last.next = temp
				temp.prev = last
				return flatten(temp)
				
		if node.next is None:
			return node
		return flatten(node.next)
		
	flatten(head)
	return head
			
#time: o(n)
#memory: o(n) #stack space
```

**Mnemonic**
Imagine a string with many splits. Our job is to cut off at the split and tie the string back together such that there are no splits (single unified string). 

**Visual** 
![[IMG_E7926AD9C338-1.jpeg]]

**Review 1**
The above implementation is a bit too clever...its no wonder I was struggling with edge cases. There is no need to complicate things. We have a very simple task: flatten the list. All we need to do is get the last node in the child list and stitch the list back together....so we do exactly that. We can use a helper function `get_tail(node)` to get the last node and stitch the list. But wouldn't that list not be flat if we are only getting the tail? Potentially yes...does that matter? NO! Because we simply move the pointer to `node.next` and we are guaranteed to capture all nested lists regardless of their depth! In fact, even recursion is not needed here! 

**Implementation (simple, iterative)**
```python

def flatten(head):
	def get_tail(node):
		while node.next:
			node = node.next
		return node

	node = head
	while node:
		if node.child:
			old_nxt = node.next
			node.next = node.child
			node.child = None
			node.next.prev = node
			if old_nxt:
				tail = get_tail(node.next)
				tail.next = old_nxt
				old_nxt.prev = tail
		node = node.next

	return head
```

#review 


