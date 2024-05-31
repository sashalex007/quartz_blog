---
date: 2024-05-27
---
**Topics:** [[set]], [[graph]], [[connected component]]

**Intuition**
This is a very efficient data structure for connected component, particularly if the graph is not static.

**Implementation**
```python
class UnionFind:
    def __init__(self, n):
        self.parent = list(range(n))
        self.count = n   #number of components

    def find(self, x):
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x]) #recursive search
        return self.parent[x]                          #for parent

    def union(self, x, y):
        root_x, root_y = self.find(x), self.find(y) #create edge
        if root_x != root_y:
            self.parent[root_x] = root_y
            self.count -= 1
```

**Visual** 


