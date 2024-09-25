---
date: 2024-09-25
---
**Link:** https://leetcode.com/problems/different-ways-to-add-parentheses/
#### Solution:

**Topics**: [[DFS]], [[expression tree]], [[divide and conquer]], [[Unique binary search trees II]]

**Intuition**
This is truly a beast of a problem. This was the first time in months that I was truly stuck and had **no idea** how to make progress. I made it as far as generating all the right results, but with duplicates that did not represent **unique** combinations of parentheses. 

Basically my first (and best) idea was to simply compute the results recursively by iterating over the string and evaluating each triplet of `number,operation,number`. This does generate all the correct results, but we get duplicates...why?

Consider the case:
```
                  '2+2+2+2'
            /        |          \                           
    (2+2)+2+2    2+(2+2)+2    2+2+(2+2)                         
    (4)+2+2      2+(4)+2      2+2+(4)
        ^^^                   ^^^ 
/    |     \                 /      |      \
... ...   (4)+(4)      (4)+(4)     ...     ... 
                \       /
                duplicates!
``` 

In this evaluation tree, we inevitably get duplicate configurations of parentheses on opposing sides of the tree! In the above case, we get `(2+2)+(2+2)` twice! 

And this is where I got stuck. I could not figure out how to make progress from here. What I missed is that we can treat the the **operations as nodes**, and in the same way as in [[Unique binary search trees II]], we can set each operation as the root, and then subsequent operations as the parents! A leaf is reached when only a number remains! 

For example:
```
Lets chose the middle + as the root:

	  '2+2+2+2'       
		  ^
		  +	
		/   \
       +     +
     /  \   /  \
    2    2 2    2   ---> (2+2)+(2+2)

When we construct the evaluation tree like this, we can only arrive at (2+2)+(2+2) a single time! There is no other way to create it!


Lets look at another case using the first + as the root:

        '2+2+2+2'           
		  ^
		  +	
		/   \
       2     +
            /  \
           2    +
               /  \
              2    2  ---> 2+(2+(2+2))


OR!

        '2+2+2+2'           
		  ^
		  +	
		/   \
       2     +
            /  \
           +    2
         /  \
        2    2      ---> 2+((2+2)+2)


Both of these trees represent unique combinations for the first + as the root!
```

We can just generate the possible trees recursively almost the same way as in [[Unique binary search trees II]], but instead of building a new tree, we simply evaluate!

**Implementation**
```python
def unique_par(expression):
	def dfs(curr):
		if curr.isdigit():
			return [int(curr)]

		res = []
		for i in range(len(curr)):
			if curr[i].isdigit():
				continue
			left = dfs(curr[:i])
			right = dfs(curr[i+1:])
			for l in left:
				for r in right:
					if curr[i] == '*':
						res.append(l*r)
					elif curr[i] == '+':
						res.append(l+r)
					else:
						res.append(l-r)
		return res

	return dfs(expression)
				

#time: o(n*(2**n))
#memory: o(2**n) --> not n*(2**n) because the outer loop only impacts time. 
```

A note on the complexity... it seems that the complexity should be the same as [[Unique binary search trees II]] `o(n*catalan(n))`. In that problem we do cache the function but thats because it's a 2d recursion. The 2d cached function should be the same as a 1d uncached function. 

#review 
#hard 
#insane 


