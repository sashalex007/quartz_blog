---
date: 2024-08-22
---
**Link:** https://leetcode.com/problems/add-two-numbers/
#### Solution:

**Topics**: [[linked list]], [[math]]

**Intuition**
Simple little problem, but a good exercise in modulus and integer division. The code more or less writes itself, but the key idea is to compute how much to carry with `total//10`,  and then masking out the tens with `total%10`. 

I spent a minute deciding whether or not to solve this in-place or create a new list...I decided that in-place would introduce too many edge cases. The editorial implementation agrees with me, also in general the output doesn't count towards the memory complexity so we can still call this constant memory.  

**Implementation**
```python
def add_two_nums(l1, l2):
	head = ListNode(-1) #dummy
	tail = head
	carry = 0
	while l1 or l2 or carry:
		val1 = l1.val if l1 else 0
		val2 = l2.val if l2 else 0
		total = val1 + val2 + carry 
		carry = total // 10

		tail.next = ListNode(total % 10)
		tail = tail.next
		l1 = l1.next if l1 else None
		l2 = l2.next if l2 else None
	return head.next

#time: o(n+m)
#memory: o(1)
```

**Review 1**
Cute problem. I like the above implementation. Very concise. 

#review 


