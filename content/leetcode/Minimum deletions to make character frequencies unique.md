---
date: 2024-05-15
---
**Link:** https://leetcode.com/problems/minimum-deletions-to-make-character-frequencies-unique/
#### Solution:

**Topics:** [[hash map]]

**Intuition**
The basic approach to this problem is understanding that a duplicate frequency must be decremented (or deleted) until we reach a frequency that has not been seen. 

For example:
```
s = aabbccccdddd
freq = {
	a:2,
	b:2,
	c:4,
	d:4
}

We can see that counts of 2 and 4 are repeated once, so they must be reduced. How can they be reduced?

Consider the set of seen frequencies: {2, 4}. Notice that there are two frequencies that are available...1 and 3. 

Optimally, the character 'c' or 'd' can be recuced to 3 and the character 'a' or 'b' can be reduced to 1. Observe that it would be far less optimal to reduce 'c' to 1, as that would result in spurious deletions. 

We should only reduce to zero (full deletion) if there are no available frequencies.

NOTE: The problem states that we can only delete, so while its also possible to make the frequencies unique by incrementing, this operation is forbidden. 

```


**Implementation**
```python
def min_deletions(s):
	freq = {}	
	for char in s:
		freq[char] = freq.get(char, 0) + 1
		
	counts = freq.values()
	seen = set()
	res = 0
	for count in counts:
		if count not in seen:
			seen.add(count)
		else:
			while count and count in seen:
				count -= 1
				res += 1
			if count:
				seen.add(count)
	return res

#time: o(n)
#memory: o(n)
```

**Visual** 
![[IMG_89BFE10859D4-1.jpeg]]

**Review 1**
This problem "got" me again. My mind initially went to sorting be frequency and then iterating backwards and decrementing by one when the next frequency is equal to the current. This does not work. Why?
```
counts = [2,2,2]
            ^       the next value is also 2, so lets make this 1. 

		 [2,1,2]
		  ^        the next value is 1, so this is fine?

No, because we have just spoiled our sorted order! There are still duplicates in the string! If we wanted to do it this way, we could use a strictly decreasing monotonic stack!
```

**Implementation (stack)**
```python
res = 0
freq = {}
for char in s:
	freq[char] = freq.get(char, 0) + 1

counts = sorted(freq.values())
stack = [counts.pop()]

while counts:
	curr = counts.pop()
	while curr and curr >= stack[-1]:
		res += 1
		curr -= 1
	stack.append(curr)

return res
```

Or we just keep a `used_freq` set and decrement as needed. This is the same implementation as in my first note but this one is cleaner:

**Implementation (set)**
```python
res = 0
freq = {}
for char in s:
	freq[char] = freq.get(char, 0) + 1
	
used = set()
for count in freq.values()
	while count and count in used:
		count -= 1
		res += 1
	used.add(count)
	
return res
```


#review 
#hard 





