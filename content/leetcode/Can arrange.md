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

#review 


