---
date: 2024-06-04
---
**Link:** https://leetcode.com/problems/image-smoother/
#### Solution:

**Topics**: [[math]]

**Intuition**
This is actually a great problem if you try to solve it in constant space. Of course the naive solution is to create a new image which is an o(n) solution. Basically the main challenge with the constant space solution, is that as we progress through the image, we would be overwriting the original values which are needed for future smoothing. 

The easiest thing to do is to keep the original image unmodified and create a new one, but we can use a nice mathematical trick to store the smoothed value AND the original value in one integer. How?

The first step is to look at the constraints. The max pixel value is 255. Building from this, we can also make the observation that `img[row][col] % 256 = img[row][col]`. We will use this property later. 

The key here is to "store" the original value into a remainder. When we compute the average, we add all 9 values together and then divide by the total number of values...but what if after  dividing, we multiplied the value by 256 and then added to that, the original value! Then, to recover the original value, we can just `%= 256`! 

For example:
```
original = 221
average = 250     #just an example...

combined = 221 + (250 * 256) #merge the values
         = 64221

original = 64221 % 256 #recover original
         = 221

This works because the term (250 * 256) yields 64000, which by definition is a multiple of 256, so the modulus nulls 64000 to 0 leaving only 221! 

In a similar way, we can recover the original average by using integer division:

average = combined // 256
        = 64221 // 256
        = 250

This works opposite to modulus...we reverse the multiplication by 256, and null out the original value of 221 because it does not fit inside of 256!
```

So by recruiting the constraint of 256, modulus operator, and integer division: we can encode both the original value and the average value in one number! Ergo, when we are smoothing, we take the original...and then we do one more pass to convert to average. 

**Implementation**
```python
def image_smoother(img):
	offsets = [
		(0, 0),
		(1, 0),
		(-1, 0),
		(0, 1),
		(0, -1),
		(1, 1),
		(1, -1),
		(-1, 1),
		(-1, -1)
	]
	
	for row in range(len(img)):
		for col in range(len(img[0])):
			sum = 0
			count = 0
			for i, j in offsets:
				new_row = i + row
				new_col = j + col
				if new_row == len(img) or new_row == -1:
					continue
				if new_col == len(img[0]) or new_col == -1:
					continue
				sum += img[new_row][new_col] % 256
				count += 1
			img[row][col] += (sum // count) * 256

	for row in range(len(img)):
		for col in range(len(img[0])):
			img[row][col] //= 256

	return img
			

#time: o(n)
#memory: o(1)
```

**Mnemonic**
You are wizard in a room with a square and a triangle. The square can only have 4 sides. Clone the triangle 4+1 (5) times. Now "smooth" or "combine" or "add" the square and all the triangles together. The result is a pyramid. You made a mistake in your spell. You need to undo and go back to just a square and a triangle. Take out your magic calculator and enter %5, now you have your square back. Enter // 5. Now you have a single triangle back. 

**Visual** 
![[IMG_FE3B19FC488D-1.jpeg]]

#review 


