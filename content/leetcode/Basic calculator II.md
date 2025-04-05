---
date: 2024-11-12
---
**Link:** https://leetcode.com/problems/basic-calculator-ii/
#### Solution:

**Topics**: [[Basic calculator]], [[stack]]

**Intuition**
This one is much, much harder than [[Basic calculator]] even though it is marked as a medium. The logic was just kind of difficult to wrap my mind around. Normally for stack problems we have a clear delineator, like a closed parentheses or something but here its much more subtle. 

Basically the equivalent of an "open" parentheses here is an operator, and "closed" is also an operator! The basic idea is we evaluate triplets on the stack **if** the operator in the middle is `*` or `/`! Essentially, we evaluate the multiplication and division first and then sum up the stack! 

Another key point is that when our stack triplet is `[...num1, '-', num2]` we simply pop off `num2` and make it negative, add it back to the stack. To evaluate triplets, our stack must be at least length of 3! It's also important to mention that we can only evaluate a triplet when a **new operator is seen...analogous to closed parentheses**. After evaluating the triplet, we add the new operator to the stack!

Also unlike in parentheses problems, we don't actually evaluate from one operator to the other. We evaluate until **one after the operator (from the back)**. 

I think adding everything to the stack and evaluating triplets is way less contrived than some of the other solutions I have seen. It's more natural IMO to do it this way and the pattern is closer to more generic stack problems. 

**Implementation**
```python
def calc_2(s):
	s += '#' #finish evaluating
	stack = []
	for char in s:
		if char.isdigit():
			if not stack or str(stack[-1]) in '+-/*':
				stack.append(0)
			stack[-1] = stack[-1]*10 + int(char)
		elif char != ' ':
			if len(stack) < 3:
				stack.append(char)
			else:
				if stack[-2] == '*':
					b = stack.pop()
					stack.pop()
					a = stack.pop()
					stack.append(a*b)
				elif stack[-2] == '/':
					b = stack.pop()
					stack.pop()
					a = stack.pop()
					stack.append(int(a/b))
				elif stack[-2] == '-':
					b = stack.pop()
					stack.pop()
					stack.append(-b)
				stack.append(char)

	res = 0
	for num in stack:
		if type(num) == int:
			res += num
	return res
					
#time: o(n)
#memory: o(n)
```

I'm marking this one as hard and insane simply because of the amount of edge cases, and also my thought process was not very good on this one.

**Review 1**
The edge cases messed me up! Initially thought I could solve it with a divide and conquer approach, and I think its possible but there are some complicated edge cases that were failing...not sure if its worth diving into them. Anyway, the stack approach is simple but not the easiest to code and full of edge cases! 

#review 
#hard 
#insane 


