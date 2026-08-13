# Chapter 13: OOP in Python – Built-in Functions

The Python interpreter has a set of readily available functions. There are 68 built-in functions in the latest versions of Python, including:
* `abs()`, `all()`, `any()`, `bool()`, `dict()`, `dir()`, `enumerate()`, `getattr()`, `hasattr()`, `len()`, `open()`, `reversed()`, `set()`, `str()`, `sum()`, `type()`, `zip()`, etc.

#### `len()`
Gets the length of a string, list, or collection. It internally calls the object's special `__len__()` method. Using the global `len(obj)` function is preferred over `obj.__len__()` because it is more efficient, easier to maintain, and backward-compatible.

#### `reversed(seq)`
Returns a reverse iterator over the sequence. The target object must support the sequence protocol (implementing `__len__()` and `__getitem__()`) or define a `__reversed__()` method. Often used in `for` loops.

#### `enumerate(iterable, start=0)`
Adds a counter to an iterable and returns an enumerate iterator yielding tuples of indices and elements:
```python
>>> names = ['Rajesh', 'Rahul', 'Aarav']
>>> list(enumerate(names))
[(0, 'Rajesh'), (1, 'Rahul'), (2, 'Aarav')]
```

#### Attribute Manipulation Functions
* `hasattr(obj, 'name')`: Checks if an object has the specified attribute.
* `getattr(obj, 'name')`: Retrieves the attribute value by its string name.
* `setattr(obj, 'name', value)`: Sets an attribute value by string name.
* `delattr(obj, 'name')`: Deletes an attribute by string name.

#### Boolean and Collection Helpers
* `all(iterable)`: Returns `True` if all elements in the iterable evaluate to true.
* `any(iterable)`: Returns `True` if at least one element in the iterable evaluates to true.
* `zip(*iterables)`: Aggregates elements from multiple iterables, returning an iterator of tuples.

