---
date: 2024-06-03
---
**Link:** https://leetcode.com/problems/happy-number/
#### Solution:

**Topics**: [[linked list]]

**Intuition**
Cool problem demonstrating the use of an implicit linked list. The naive solution would of course use more memory as the cycle detection would be handled by a set which is o(n) memory.

Instead we treat this like a linked list and use a fast/slow pointer to handle cycle detection in o(1) memory. 

**Implementation**
```python
def happy_number(n):
	def process(num):
		num = str(num)
		num = [int(digit)**2 for digit in num]
		return sum(num)

	slow = n
	fast = n
	while slow != 1 and fast != 1:
		slow = process(slow)
		fast = process(process(fast))
		if slow == fast and slow != 1:
			return False
	return True
		
#time: o(logn) just remember logn. 
#memory: o(1)
```

**Mnemonic**
We are in number land. Each number is linked to the next number in a list. Its happy if the list is straight and sad if the list has a loop. 

**Visual** 
![[IMG_5AC0B84A5C9F-1.jpeg]]

**Review 1**
I was happy (haha) to find the linked list solution here. Just remember that the squared digits are summed, not concatenated (read the damn problem statement Alex). 

#review 


