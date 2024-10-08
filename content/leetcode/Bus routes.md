---
date: 2024-05-15
---
**Link:** https://leetcode.com/problems/bus-routes/ 
#### Solution:

**DSA:** [[BFS]]

**Intuition**
The key to understanding this problem is that we only care about the buses.
For example, if we hop on a bus that has the destination stop in the route, we are done. 

Think about this problem in terms of bus hops. If two buses have routes that intersect (one or more stops in common), then we can hop to it. 

Since multiple buses can have 'source' stop in their route, we have to add all of them to our BFS queue (bus, 1). Bus is the bus index and 1 is how many buses we have taken. Then in the BFS, we iterate over all the buses, and if that buses route intersects with the current bus, we hop to it! 

We also don't want to revisit buses because this would result in a cycle and conceptually, the shortest path by definition should not have a cycle in it...you should never end up on the same bus more than once. 

**Implementation**
1. Convert all routes into a set
2. Find all buses with 'source' (thats the starting point), add them to list
3. Add all source buses to queue as a tuple (index_of_bus, 1) - we add 1 into the tuple because it represents the number of buses we start with
4. Inside the BFS, loop through all the routes and add the ones with an intersection to the current route
5. keep track of visited routes

**Visual**
![[IMG_8BFF88A4CBC8-1.jpeg]]

**Review 1**
It's not about the target stop because as soon as you get on a bus that has the target stop in it's route, you can consider yourself at the stop because there is no stop-to-stop time penalty. In other words, since we are looking for the minimum number of transfers then it is conceivable that the route with the lowest number of transfers will have the highest number of stops. 

#review 

