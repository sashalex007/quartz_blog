---
date: 2024-08-22
---
**Link:** https://leetcode.com/problems/longest-palindromic-substring/
#### Solution:

**Topics**: [[grow]]

**Intuition**
This is actually a pretty easy problem with a somewhat annoying implementation. Basically, at every index we try to created the longest possible palindrome. The only way to do that is to assume the index is at the centre, and then expand in both left and right directions. 

This will work for palindromes of odd length, however we must also check palindromes of even length where the centre is two elements! 

A notable optimization here is to keep the longest palindrome as a tuple `(l, r)` because slicing is a `o(n)` operation. This way, we will only have to slice once when we return the result. 

**Implementation**
```python
def longest_palin(s):
	def grow(l, r):
		if l != r and s[l] != s[r]:
			return (l, l)
		rang = (l, r)
		while l > -1 and r < len(s) and s[l] == s[r]:
			rang = (l, r)
			l -= 1
			r += 1
		return rang

	compare = lambda x: x[1]-x[0]
	longest = (0, 0)
	for i in range(len(s)-1):
		longest = max(longest, grow(i, i), grow(i, i+1), key=compare)
	return s[longest[0]:longest[1]+1]

#time: o(n**2)
#memory: o(1)
```

**Review 1**
I knew right away how to solve it with the [[grow]] method but I decided to wander a bit into binary search. There is actually a very cool binary search solution, but It will be `o(n*n(logn))`. You might be thinking, how do we use binary search to look for a palindrome? Two passes! A pass for odd length and a pass for even length!
```
'aaaaaaa'

palindrome lengths: 1, 3, 5, 7

'bbbbbbbb'

palindrome lengths: 2, 4, 6, 8
```

Notice that the lengths have a monotonic property! We can use binary search on even and odd lengths separately. You can't use binary search on the entire range at once because the monotonic property would be broken. In other words, for a palindrome of length 3, it is not guaranteed that there exists a palindrome of length 2....however length 1 is guaranteed. 

Complexity will still be `o(n*n(logn))` because we have to slice and reverse the string to identify the palindrome, however we can bring this down to `o(nlogn)` if we use `memoryview`. 

Note that [[KMP]] only words for palindromes that start at index 0. It cannot actually find a palindrome that starts at the middle of the string. [[Mancher's]] algorithm is the one to use for this...but I won't get into it. 

#review 


