# Chapter 18: OOP in Python – Overriding & super()

When a subclass defines a method present in its superclass, it overrides the parent's method. You can still invoke the overridden superclass method using the `super()` function:

```python
class Thought(object):
    def message(self):
        print("Thought, always come and go")

class Advice(Thought):
    def message(self):
        super(Advice, self).message() # Call superclass method
        print('Warning: Risk is always involved!')
```

### Inheriting the Constructor
If a child class does not declare an `__init__` constructor, Python searches up the tree and calls the parent's `__init__`. To initialize state in both the parent and child constructors, explicitly call the parent constructor in the child class using `super()`:

```python
class Animal(object):
    def __init__(self, name):
        self.name = name

class Dog(Animal):
    def __init__(self, name, breed):
        super(Dog, self).__init__(name) # Invokes Animal constructor
        self.breed = breed
```
Using `super()` keeps the class hierarchy modular and simple to maintain compared to calling class names directly.

