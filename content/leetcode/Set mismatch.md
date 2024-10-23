---
date: 2024-07-25
---
**Link:** https://leetcode.com/problems/set-mismatch/
#### Solution:

**Topics**: [[math]]

**Intuition**
This is a cool little problem to solve if we decide not to use any extra space. Of course we could create another set and solve the problem in one pass, but that solution is not worth discussing. How can we solve this problem in constant space?

The key insight here is understanding that there are only `1-n` numbers in the uncorrupted set, so therefore `nums` has exactly `n` indices. We can use this property to index into `nums[i]-1` index and mark that number as "seen" by setting the element to negative...this represents the state of `nums[i]`. The index whose element is negative on the first pass, has thus been seen twice and is the duplicate value. The one remaining index with a positive element would be the missing value. 

Basically we are using negative/positive as a "set" of sorts to store state. 

**Implementation**
```python
def set_mismatch(nums):
	res = []
	for i in range(len(nums)):
		index = abs(nums[i])-1
		if nums[index] < 0:
			res.append(index+1)
		else:
			nums[index] *= -1

	for i, num in enumerate(nums):
		if num > 0:
			res.append(i+1)
			return res
		
#time: o(n)
#memory: o(1)
```

**Mnemonic**
We have a bunch of people who we owe money to...but we have no way of writing down or recording who was paid...such that we do not pay them twice. So when we pay someone, we punch them in the face to give them a black eye. If a person comes to get paid with a black eye, we know that he has been already been paid, so we punch him in the face again. 

**Visual** 
![[IMG_AD500A123FF7-1.jpeg]]

**Review 1**
I was pleased to have found the constant space solution in a short time. Fun problem. 

#review 


