---
date: 2024-06-02
---
**Link:** https://leetcode.com/problems/check-if-array-pairs-are-divisible-by-k/
#### Solution:

**Topics**: [[hash map]], [[math]]

**Intuition**
Very nice problem requiring the use of modulus and hash map. The key to this problem is understanding that there are potentially many pairs, but what they all have in common is that their remainders (when modded by `k`) will add up to `k`.

For example:
```
k = 2
arr = [3, 3]

arr[0] % k = 1
arr[1] % k = 1

The remainders add up to k, so (3,3) is a valid pair (and only pair). The pairs add up to 6 so indeed the sum of the pair is divisible by 2.
```

Another example:
```
k = 2
arr = [3, 9]

arr[0] % k = 1
arr[1] % k = 1

The remainders add up to k, so (3,9) is a valid pair. The pairs add up to 12 so indeed the sum of the pair is divisible by 2.
```

Another:
```
k = 2
arr = [3, 2]

arr[0] % k = 1
arr[1] % k = 0

The remainders do not add up to 2, so this pair is invalid. The pairs add up to 5 which is not divisible by 2.

```

So what we have is a has/needs pattern where we can iterate over `arr` and keep frequency map of the remainders seen. Before adding the remainder to the hash map, we check if the remainder `k - curr_remainder` exists (this is the `needs`). If it does, decrement the count of `needs`, and continue. 

The notable edge case is if `curr_remainder` is 0. In this case the only suitable pair would also have a remainder of 0. This is handled by using `% k` on `needs`.

Implementation
```python
def can_arrange(arr, k):
	remainders = {}
	for num in arr:
		remainder = num % k
		needs = k - remainder
		needs %= k
		if needs in remainders:
			remainders[needs] -= 1
			if remainders[needs] == 0:
				del remainders[needs]
		else:
			remainders[remainders] = remainders.get(remainders, 0) += 1
			
	return len(remainders) == 0
		

#time: o(n)
#memory: o(n)
```

**Mnemonic**
In forest, talking CANARY (can-arrange) bird trading (has/needs) REMAINING seeds. 

**Visual** 
![[IMG_990A9CF4FA8E-1.jpeg]]

**Review 1**
This one was tricky for me but I figure out the right approach, just had some difficulty with the implementation. I'm tagging this one hard because of how long it took me to make the connection to modulus. 

We must look at what actually makes a valid pair:

```
nums = [1, 9] 
k = 5

(1, 9) is a valid pair which sums to 10 which is divisible by 5

1 % 5 = 1
1 % 9 = 4

We see that their remainders add up to make k, so we can use this property to find pairs using a hashmap of remainders!

```

Basically this is a has/needs pattern. Number `num` has a remainder `r` and to complete a pair we need a number `num2` with a remainder `k-r`! We can use a frequency map! 

The one notable edge case is if `num` has a remainder of `0`. In that case `k-r` will equal to `k`, which is not possible to have as a remainder. What we actually need is another number with a remainder of `0` because the number `num` MUST have a pair. 

Basically we iterate over `nums` and if `k-r` exists in the remainder hash map, we decrement it and delete it if the count is zero. Otherwise we add the current `r` to the hash map or increment it!

At the end of this process, the length of the hash map must be zero! This indicates that every number has been paired. 

There is also a great [[two pointer]] solution! If we sort the numbers by their remainders, we find that the smallest remainders will always be paired with the largest ones. So after sorting we can initialize a left and right pointer and move towards the middle. If a `arr[l] + arr[r]` does not form a valid pair, we return false. Otherwise return true at the end. 

The notable edge case is again if the modulus is equal to zero. In that case we can only pair with another number whose remainder is also zero. This would break our 2 pointer algorithm so we must handle it up front. Basically we iterate over the start of the sorted array with a stride of 2 and if  `arr[i] % k != 0`  we stop. If `arr[i] % k != arr[i+1] % k`, we return false (odd number of numbers with remainder of 0). 

**Implementation (two pointer)**
```python
def can_arrange(arr):
	arr.sort(key=lambda x: x % k)
	l = 0
	for i in range(0, len(arr), 2):
		if arr[i] % k != 0:
			l = i
			break
		if arr[i+1] % k != 0:
			return False

	r = len(arr)-1
	while l < r:
		if (arr[l] + arr[r]) % k != 0:
			return False
		l += 1
		r -= 1
	return True
```

#review 
#hard


