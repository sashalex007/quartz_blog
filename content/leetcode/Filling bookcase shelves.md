---
date: 2024-08-26
---
**Link:** https://leetcode.com/problems/filling-bookcase-shelves/
#### Solution:

**Topics**: [[DP]]

**Intuition**
This is a very tricky DP problem, and we know it is DP because there is no greedy approach that can be used to make an optimal local decision. It took me a while to figure out how to structure the recursion but, fundamentally, this is a still a take/skip pattern...or add-to-shelf/start-new-shelf. 

The tricky part is figuring out what the recursive function needs in order to compute the result correctly. I think its easiest to view this in terms of `current_width, current_height`. Current_width will control our adding-to-shelf logic and current_height is not the total height but rather the height of the current shelf...which is just the height of the tallest book. When we decide to add a new shelf, the current_height will simply be added to the result. 

The code is pretty easy to understand, but admittedly the process of getting there is quite tricky unless you are very strong in DP patterns...even the editorial is a train wreak (at least the top-down explanation is). 

**Implementation**
```python
def fill_shelves(books, shelfWidth):
	@cache
	def dfs(i, curr_width, curr_height)
		if curr_width < 0:
			return float('inf')
		if i == len(books):
			return curr_height
		book_width, book_height = books[i]
		
		add = dfs(i+1, curr_width - book_width, max(curr_height, book_height))
		new = curr_height + dfs(i+1, shelfWidth - curr_width, book_height)
		return min(add, new)

#time: o(n*shelf_width)
#memory: o(n*shelf_width)

#Note: in this implemenation I am using @cache, which will use a bit more memory because we are caching curr_height as well so technically this is 3d DP, although curr_height is unlikely to change for every book, unless the heights are strictly increasing. Leetcode seems to not have an test case that would punish this, so using @cache here is OK. 

#We could also use a memo with the key (i, curr_width) to bring this back down to strictly 2d DP. This is fine because each combination of i and curr_width are implicitly defining a range in books, and within this range there is only one possible max_book_height. 

#(i, curr_width) is implicitly defining a range, because i is the right pointer and the left pointer is where the sum of widths would equal zero if each book behind i was subtracted from curr_width. 
```

**Mnemonic**
You have a pile of books. You can either add the book to the current shelf, or build a new shelf with the current book as it's start. 

#review 


