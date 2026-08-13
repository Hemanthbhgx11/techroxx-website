# Chapter 20: OOP in Python – Static & Class Methods

Methods are categorized by how they behave and what parameters they receive:
* **Instance Methods**: Default methods. Receive the object instance `self` as the first argument; can read and modify instance and class state.
* **Class Methods**: Decorated with `@classmethod`. Receive the class parameter `cls` instead of `self`. They cannot access instance state but can access and modify class-level state. Commonly used to implement **factory methods**.
* **Static Methods**: Decorated with `@staticmethod`. Receive neither `self` nor `cls` parameters. They act like plain utility functions bound to the class namespace.

```python
class MyClass(object):
    class_attr = 99
    
    @classmethod
    def class_method(cls):
        print(f"Class attribute is {cls.class_attr}")
        
    @staticmethod
    def static_method():
        print("Static method has no access to state variables")
```


