---
date: 2024-05-15
---
**Link:** https://leetcode.com/problems/redistribute-characters-to-make-all-strings-equal/
#### Solution:

**Topics:** [[hash map]], [[permutation]]

**Intuition**
Nice little problem testing some hash map intuition. The idea is to recognize that we must pool all the characters in every word and then distribute them back to each word equally. If we cannot distribute a character equally, then one or more of the words would be different.

Conceptually, the exact word we create is irrelevant to the problem, if the frequency map of each word is the same after our operations, then we can make the words the same any number of ways.

The cleanest way to implement this is to pool all the characters into a frequency map and check if the count of each character is divisible by the number of words.

**Implementation**
```python
def distribute_chars(words):
	freq = {}
	for word in words:
		for char in word:
			freq[char] = freq.get(char, 0) + 1

	for count in freq.values():
		if count % len(words):
			return False
	return True

#time: o(n)
#memory: o(1) because the hashmap can only grow to 27 elments
```

**Visual** 
![[IMG_D75D39983648-1.jpeg]]

**Review 1**
Too easy. Solved in 10 seconds. 

#review 


