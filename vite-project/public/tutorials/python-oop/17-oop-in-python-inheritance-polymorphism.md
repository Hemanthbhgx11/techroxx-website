# Chapter 17: OOP in Python – Polymorphism

Polymorphism refers to having identically named methods across different classes or subclasses. This allows code to use objects of dissimilar types through a common interface without knowing their exact classes, fostering loose coupling:

```python
class Dog(object):
    def show_affection(self):
        print("Wags tail")

class Cat(object):
    def show_affection(self):
        print("Purrs")

for animal in (Dog(), Cat()):
    animal.show_affection() # Same method name displays polymorphic behavior
```

