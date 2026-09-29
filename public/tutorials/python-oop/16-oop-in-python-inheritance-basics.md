# Chapter 16: OOP in Python – Inheritance Basics

Inheritance allows you to define a general base (parent) class and extend it to specialize its behavior in derived (child) subclasses, enhancing code reusability. Non-private attributes and methods in the base class are inherited by the child class.

#### Syntax
```python
class BaseClass:
    # Base class body
    pass

class DerivedClass(BaseClass):
    # Derived class body
    pass
```

#### Attribute Lookup Hierarchy
When accessing an attribute, Python checks:
1. The instance dictionary.
2. The instance's class.
3. Any base classes from which the class inherits (climbing the tree).

```python
class Date(object):
    def get_date(self):
        return '2018-02-02'

class Time(Date):
    def get_time(self):
        return '09:00:00'

tm = Time()
print(tm.get_time()) # Inherited method called
print(tm.get_date()) # Climbs tree to find method in Date class
```

