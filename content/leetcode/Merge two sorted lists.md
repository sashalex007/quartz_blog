---
date: 2024-11-12
---
**Link:** https://leetcode.com/problems/merge-two-sorted-lists/
#### Solution:

**Topics**: [[linked list]], [[dummy node]]

**Intuition**
I don't know why but I always over complicate this. Lets go over it properly once and for all! There is no need for contrived splicing logic or temp variables! You can literally treat this exactly like like merging two sorted arrays if the variables are set up correctly. 

Create a dummy node and a head pointing to the dummy node. Why? Because this will eliminate the need for dumb pointer logic. The `head` pointer will "pick up" the list values, no need for temp variables!

I'm marking this as hard, not because it is but because I always go for the most complicated way implementation and I'm sick of it. 

**Implementation**
```python
def merge_sorted_ll(list1, list2):
	dummy = ListNode(-1)
	head = dummy 
	while list1 and list2:
		if list1.val < list2.val:
			head.next = list1
			list1 = list1.next
		else:
			head.next = list2
			list2 = list2.next
		head = head.next
	if list1:
		head.next = list1
	if list2:
		head.next = list2
	return dummy.next

#time: o(m+n)
#memory: o(1)
```

#hard 
#review 


