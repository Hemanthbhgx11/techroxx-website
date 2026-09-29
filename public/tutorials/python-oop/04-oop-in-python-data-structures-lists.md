# Chapter 4: OOP in Python – Lists & Empty Objects

Lists represent the most versatile data structure in Python. A list is a mutable container holding comma-separated items inside square brackets `[]`. Indices start at zero.

```python
>>> # An Empty List
>>> empty_list = []
>>>
>>> # A list of Strings
>>> str_list = ['Life', 'Is', 'Beautiful']
>>>
>>> # Mixed items list
>>> mixed_list = ['This', 9, 'is', 18, 45.9, 'a', 54, 'mixed', 99, 'list']
>>>
>>> # Accessing items by index
>>> mixed_list[0]
'This'
>>> mixed_list[3]
18
>>> mixed_list[-1]
'list'
```

### Empty Objects
Empty objects are the simplest and most basic built-in types. Direct objects created with `object()` cannot have arbitrary attributes set on them because Python disables arbitrary properties on built-in types to save memory. However, you can write an empty class definition to block space for future extensions:

```python
>>> obj = object()
>>> obj.x = 9
Traceback (most recent call last):
AttributeError: 'object' object has no attribute 'x'

>>> # Empty custom class allows properties
>>> class EmpObject:
...     pass
...
>>> obj = EmpObject()
>>> obj.x = 'Hello, World!'
>>> obj.x
'Hello, World!'
```
*Note*: Grouping properties in empty objects is useful, but classes and objects should primarily be used when specifying both data and behaviors.

