---
date: 2024-07-16
---
**Link:** https://leetcode.com/problems/my-calendar-i/
#### Solution:

**Topics**: [[SortedList]], [[binary search]], [[bisect module]]

**Intuition**
This is kind of a very annoying problem without using [[SortedList]] or the python [[bisect module]]. My first approach was just to use a doubly linked list to maintain sorted order. This makes alot of sense because for every booking we can just traverse the linked list and look for a suitable position. If a suitable position has been found, we can do an `o(1)` insertion into the doubly linked list. So the complexity will just be `o(n)` for each booking, or `o(n**2)` for all bookings. 

It turns out though that most languages have something equivalent to [[SortedList]], which maintains all elements added to it in sorted order with `o(logn)` insertion. So as long as we can have logarithmic insertion, binary search starts to make sense. When using a regular list, insertion would be `o(n)`, and with binary search `o(nlogn)` for each booking...which is worse than the doubly linked list approach. But with [[SortedList]], our complexity goes down to `o(2logn)...or simplified o(logn)`! 

The manual binary search approach is pretty annoying because we must hardcode the two edge cases where the insertion must happen at the front and end of the list. This is required because we can only conduct our binary search on one term (start or end) in the interval, and thus we must check either the previous booking or the next booking for a conflict. The [[bisect module]] makes this a lot cleaner, which I will include as an alternate implementation. 

**Implementation** 
```python
from sortedcontainers import SortedList

class MyCalendar:
	def __init__(self):
		self.bookings = SortedList()
	def book(self, start, end):
		if self.bookings[0][0] >= end:
			self.bookings.add((start, end))
			return True
		if self.bookings[-1][1] <= start:
			self.bookings.add((start, end))
			return True

		l = 0
		r = len(self.bookings) - 1
		while l <= r:
			mid = (l + r) // 2
			if start >= self.bookings[mid][1] and end <= self.bookings[mid+1][0]:
				self.bookings.add((start, end))
				return True
			if self.bookings[mid][0] <= start:
				l = mid + 1
			else:
				r = mid - 1
		return False
	

#time: o(nlogn) at most 2logn for each booking
#memory: o(n) in the case that all bookings get booked
```

**Implementation (bisect module)** 
```python
from sortedcontainers import SortedList

class MyCalendar:
	def __init__(self):
		self.bookings = SortedList()
		
	def book(self, start, end):
		index = self.bookings.bisect_right((start, end))
		if index > 0 and self.bookings[index-1][1] > start:
			return False
		if index < len(self.bookings) and self.bookings[index][0] < end:
			return False

		self.bookings.add((start, end))
		return True

#time: o(nlogn) at most 2logn for each booking
#memory: o(n) in the case that all bookings get booked
```

**Mnemonic**
Plastic transparent container  with sorted written in black sharpie on the side. Inside the container is my 3d printed bisecting calliper and a paper calendar. (`sortedcontainers` and `bisect_right`).

**Visual** 
![[IMG_1E9EC89EF0CB-1.jpeg]]

**Review 1**
Ultra annoying problem. I totally forgot about [[SortedList]] module! The edge cases are wild for this one. 

#review 
#hard 


