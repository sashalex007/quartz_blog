---
date: 2024-09-20
---
**Link:** https://leetcode.com/problems/find-the-longest-substring-containing-vowels-in-even-counts/
#### Solution:

**Topics**: [[bit mask]], [[bitwise]], [[Subarray sum equals k]], [[Contiguous array]]

**Intuition**
This is an incredible problem, yet the editorial is so unnecessarily complex. The [[bit manipulation]] solution is very efficient but since I have no interest in becoming a game developer, I'll just do it the far simpler but slightly slower way. 

When I first read this problem, my mind went to sliding window but then it became clear that there is no condition that can be devised for shrinking the window. In other words, if the current window is not vowel-even, we can't eliminate it from the window because lengthening the window could "balance out" the whole window and make it vowel-even. 

This is actually exactly why we cannot solve [[Subarray sum equals k]] with a sliding window! You can never know if future elements can combine with the current elements to make the sum equal to k! 

[[Contiguous array]] is essentially the same problem as this, except in that one we reduce the problem to [[Subarray sum equals k]] where `k = 0` and we also store indices to reconstruct the length of the valid partition. 

For this problem we do essentially the same thing as in [[Contiguous array]], except instead of storing looking for a sum that has been seen previously, we look for a **(count[i]%2) of vowels** that has been seen previously!

For example:
```
s = 'dee'

substring |  count%2 
--------------------
'd'       | (0, 0, 0, 0, 0)
'de'      | (0, 1, 0, 0, 0)
'dee'     | (0, 0, 0, 0, 0)

The tuple (0, 0, 0, 0, 0) stores a bit for each vowel, and we flip the respective bit each time it's vowel has been encountered!

If we have already seen the current tuple at some point in the past, it means that the "seen" partition can be cut off from the current one to make an even-voweled string! 

This is EXACTLY the same hashmap technique used in 'contiguous array' problem. And just like that problem, we also store the index in the hashmap so that we can reconstruct the even-voweled string.
```

**Implementation (tuple)**
```python
def even_voweled(s):
	longest = 0
	seen = {(0, 0, 0, 0, 0): -1}
	bits = [0, 0, 0, 0, 0]
	for i, char in enumerate(s):
		if char == 'a':
			bits[0] = 1 if bits[0] == 0 else 0
		if char == 'e':
			bits[1] = 1 if bits[1] == 0 else 0
		if char == 'i':
			bits[2] = 1 if bits[2] == 0 else 0
		if char == 'o':
			bits[3] = 1 if bits[3] == 0 else 0
		if char == 'u':
			bits[4] = 1 if bits[4] == 0 else 0

		t = tuple(bits) 
		if t in seen:
			longest = max(longest, i - seen[t])
		else:
			seen[t] = i
	return longest
	
#time: o(n)
#memory: o(n)
```

I decided to also do the bit manipulation implementation. Basically we create a bit and then use bit-shifting on the first 5 bits from the right and use the XOR operation to toggle the bit. 

**Implementation (bit shifting)**
```python
def even_voweled(s):
	longest = 0
	bit = 0
	seen = {bit: -1}
	vowels = {'a':0, 'e':1, 'i':2, 'o':3, 'u':4}
	for i, char in enumerate(s):
		if char in vowels:
			mask = 1 << vowels[char] #this is like "going" to the bit
			bit = bit ^ mask #XOR (toggle)
		if bit in seen:
			longest = max(longest, i - seen[bit])
		else:
			seen[bit] = i
	return longest

#time: o(n)
#memory: o(n)
		
```

#review 


