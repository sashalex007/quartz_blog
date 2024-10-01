---
date: 2024-09-29
---
**Link:** https://leetcode.com/problems/shortest-palindrome/
#### Solution:

**Topics**: [[KMP]]

**Intuition**
This problem is a great (albeit pretty advanced) intro into the [[KPM]] algorithm (Knuth-Morris-Pratt). But first lets lay the ground work by solving this problem sub-optimally. 

The key observation in this problem is the fact that we want to identify the longest palindrome in `s` that start at index 0. Why? Because the longer the palindrome that starts at index 0, the less characters we have to add to the front to make the string a palindrome. Think of this as "recycling" the existing palindrome.

For example:
```
s = 'ab'
     ^ 'a' is the longest palindrome
res = 'bab'

s = 'aab'
     ^^ 'aa' is the longest palindrome
res = 'baab'

s = 'racecartoyota'
     ^^^^^^^ 'racecar' is the longest palindrome
res = 'atoyotracecartoyota'
```

Basically the idea is to find the longest palindrome in `s` that starts at index 0 and then add the remaining characters to the front of `s` in reversed order. With this logic we can come up with a pretty decent `o(n*n)` solution. 

It should be obvious that `palin == palin[::-1]`, so we can use this on a shrinking window to find the longest palindrome.

**Implementation (n^2)**
```python
def shortest_palin(s):
	t = s[::-1]
	for i in range(len(s)):
		if t[i:] == s[:len(s)-i]:
			return t[:i] + s  #t[:i] == s[len(s)-1:][::-1]
	return '' #technically unreachable

#time: o(n*n)
#memory: o(n)
```


There is actually an `o(n)` implementation with the [[KMP]] algorithm. This is my first [[KMP]] problem so I'll do my best. 

So the idea behind [[KMP]] is to build a data structure based on string `s` that tells us **where the new start is** depending on how far we have reached in the matching, and only continue matching at that point in the pattern! 

For `s = aab`, if the mismatch occurred at index 0, well we move on, there is nothing to be gained. Likewise with index 1. But if the mismatch occurred at index 2, we know that `aa` has already been matched, so we don't have to restart the matching at the start of the pattern, rather we can restart the matching at index 1 of the pattern because we already matched `aa` so we know that `a` has been matched, and it also happens to be the case that the pattern starts with `a`, so index 1 in the pattern is a valid new starting point!

Essentially, if we have a partial match that it means we also have a **smaller-than-partial match**....in some cases this smaller-than-partial match can be reused **if and only if** the partial match also matches a prefix of the pattern:

```
Here is a very demonstrative case:

s = 'aaab'  #this is the string to match
t = 'aaacaaab'
lps = 

* = match
! = mismatch

aaacaaab
* 
aaab
 * 
aaab
  * 
aaab
   !     b != c
 aaab
   !     a != c
  aaab
   !     a != c
   aaab
    *
    aaab
     *
    aaab
      *
    aaab
       * ----> found string

		   
Take a close look at the mismatches at 'c'!
Instead of restarting the matching at index 1, we "slide" the pattern forward and therby gain a linear time complexity!

This makes sense because of a particular property of 'aaab'.... the substring 'aaa' has PREFIX that is also a SUFFIX:

aaa
^^  prefix 'aa'
 ^^ suffix 'aa'

This property is what gives us the right to "slide" the pattern forwards when a missmatch occurs at 'b'. Intuitively this makes sense because if we mismatch at 'b', that means we have already matched 'aaa' and instead of throwing out the partial match, we say ok...'aaa' did not work out so lets try 'aa'! 

Lets look at a case where doing this would not make sense:

pattern = 'abcd'
s = 'abcgefg'

abcgefg
   !    g != d
abcd

We see that there is a mismatch at index 3, so why not slide the pattern? The fact is, there is nothing that we can do with the partial match 'abc' because there is no prefix that is also a suffix! 

'abc' did not work out, but we have no right to try with 'bc' because the pattern does not start with 'bc', so we would be looking for a different string!
```

At the heart of the [[KMP]] algorithm is the generation of a **longest prefix that is also a suffix** array or **LPS**. This array tells us the length of the longest prefix that is also a suffix at every index of the pattern:
```
s  = 'aaab'
lps = [0, 1, 2, 0]
          ^
          a       ----> aa
             ^
             aa   ----> aaa
                

s = 'abcd'
lps = [0, 0, 0, 0] 

there is prefix that is also a suffix because there is no instance that starts with 'a' anywhere in the pattern apart from the start itself. 

s = 'abcabc'
lps = [0, 0, 0, 1, 2, 3]
                ^ 
                a 
                   ^
                   ab
                      ^
                      abc
```

So how do we use this LPS array? The key idea is that if there is a mismatch at index `i` in the LPS array, `lps[i-1]` is the next index in the pattern that is a new valid starting point! Here is the code to generate an LPS array for a particular pattern:
```python
def generate_lps(pattern):
	lps = [0]*len(pattern)
	length = 0
	i = 1
	while i < len(pattern):
		if pattern[i] == pattern[length]: 
			length += 1         #increase length
			lps[i] = length     #set the lps array
			i += 1              #continue
		else:
			if length != 0:
				length = lps[length-1] #try with the previous valid partial match
				                       #this is like shrinking the window
			else:
				i += 1 #if length=0, continue
	return lps
```

So now using this LPS array, lets just implement a straight forward `o(n)` string matching function before we solve the actual problem. This function will just count the number of occurrences of `pattern` in `s`.

```python
def kmp_search(pattern, s)
	lps = generate_lps(pattern)
	count = 0
	i = 0
	j = 0
	while i < len(s):
		if s[i] == pattern[j]:
			i += 1
			j += 1
			if j == len(s):
				count += 1
				j = lps[j-1] #reset pattern
		else:
			if j != 0:
				j = lps[j-1]
			else:
				i += 1
	return count
	
#As can be seen, the search function is very similar to the code that 
#generates the LPS array!

#time: o(n)
#memory: o(n) lps array
```

Ok. So now that we know how to implement a KMP string matching algorithm lets look at how it helps us solve the [[Shortest palindrome]] problem. For this problem we need to find the longest palindrome in `s` that starts at index 0, and then append to the front the reverse of the remaining string. 

How can we modify the KMP algorithm to find the longest palindrome in `s` that starts at index 0?

Lets create a new string `s + '#' + s[::-1]` and build an LPS array for it. The delimiter `#` is important for reasons we will see later. 

```
s = racecarx
s + '#' + s[::-1] = racecarx#xracecar

Now lets build the LPS array for string 'racecarx#xracecar'

 r a c e c a r x # x r a c e c a r
[0,0,0,0,0,0,1,0,0,0,1,2,3,4,5,6,7] ---> lps array
```

Because of the way we modified the string, the last index in the LPS array gives us the length of the longest palindrome that starts at index 0! The delimiter `#` is required because of the following case:

```
s = aaaaaa
s + s[::-1] = aaaaaaaaaaaa

Now lets build the LPS array for string 'racecarx#xracecar'

 a a a a a a a a a a a  a 
[0,1,2,3,4,5,6,7,8,9,10,11] ---> lps array
```

As we can see there is no length of 11 in string `aaaaaa`, so it's important that we reset the LPS array to `0` at the delimiter. 

There is actually no need to even build the LPS for indices before the delimiter, but lets keep it simple and generic. (I tried this and there are too many edge cases). 

**Implementation (KMP)**
```python
def shortest_palin(s):
	def generate_lps(pattern):
		lps = [0]*len(pattern)
		length = 0
		i = 1
		while i < len(s):
			if s[i] == s[length]:
				length += 1
				lps[i] = length
				i += 1
			else:
				if length != 0:
					length = lps[length-1]
				else:
					i += 1
		return lps

	t = s[::-1]
	lps = generate_lps(s + '#' + t)
	longest = lps[-1]	
	return t[:len(s)-longest] + s
	
```

#review 
#hard 
#insane 

