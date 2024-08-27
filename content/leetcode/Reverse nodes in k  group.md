---
date: 2024-08-27
---
**Link:** https://leetcode.com/problems/reverse-nodes-in-k-group/
#### Solution:

**Topics**: [[linked list]], [[recursion]]

**Intuition**
This is a fantastic linked list problem! Reversing a linked list is trivial but reversing `k` long partitions and connecting them together is quite tricky. 

Lets look at this problem from a high level before going into the approach:
```
[1,2,3,4], k = 2

[1,2,3,4]
 ^ ^      this partition gets reversed

[1,2,3,4]
     ^ ^  and this partition gets reversed

resulting in:

[2,1,4,3]

This is simple enough, but observe that 1 MUST point to 4...so BEFORE [1,2] can be reversed, we must reverse [3,4]!
```

Ergo, the last partitions of length `k` must be reversed before preceding ones, thus [[recursion]] is the natural choice! 

This is how:
```
[1,2,3,4], k = 2

reverse([1,2]) ---->   [2,1] is the result
1.next = reverse([3,4])
return 2 
```

Essentially, we set the new `tail.next` (of the reversed list) to the reverse of the next partition, and then return the new `head`!

There is one notable edge case. If there are less than `k`  nodes in the last partition, we must return it unmodified. This will require simply making sure that there are at least `k` nodes remaining in the current partition before reversing. Technically this make the problem `o(2n)` time, but thats ok. 

Also, if `k == 1`, just return the head of the list...no reversing required. 

**Implementation**
```python
def rev_k_nodes(head, k):
	if k == 1:
		return head

	def dfs(node):
		if node is None: #technicaly this check is not needed because we 
			return None  #are doing it effectively twice when we count the nodes.
                         #I will leave it because it is cannonical. 
                         
		check = node
		for _ in range(k): #check if at least k nodes remaining
			if check == None:
				return node
			check = check.next

		head = node
		prev = None
		for _ in range(k): #reverse k nodes
			temp = head.next
			head.next = prev
			prev = head
			head = temp
			
		node.next = dfs(head) #node is the new tail, head is the remaining list
		return prev #prev is the new head, return it

	return dfs(head)
		
#time: o(n) or o(2n)
#memory: o(n) stack space
```

#review 
#hard 


