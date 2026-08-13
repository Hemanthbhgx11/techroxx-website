# Chapter 19: OOP in Python – Multiple Inheritance & MRO

Multiple inheritance is when a class inherits from multiple parent classes.
```python
class Child(Mother, Father):
    pass
```

#### Method Resolution Order (MRO)
Python searches for attributes using the Method Resolution Order (MRO).
* By default, Python searches class hierarchies in a **depth-first** order.
* For "diamond shape" multiple inheritance hierarchies (where parents share a grandparent class), Python resolves ambiguity by removing earlier duplicate appearances of a class in the MRO, resulting in a cleaner lookup tree:

```
  Grandparent (A)
   /         \
Parent (B)  Parent (C)
   \         /
    Child (D)
```
In this scenario, D's MRO resolves to: `D -> B -> C -> A`.

```python
class A(object):
    def dothis(self):
        print('doing this in A')

class B(A):
    pass

class C(A):
    def dothis(self):
        print('doing this in C')

class D(B, C):
    pass

d_instance = D()
d_instance.dothis() # Prints "doing this in C" because MRO is D -> B -> C -> A
print(D.mro())
```

