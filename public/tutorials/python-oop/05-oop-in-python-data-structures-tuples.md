# Chapter 5: OOP in Python – Tuples

Tuples are similar to lists but are **immutable** (cannot add, remove, or replace elements). They are enclosed in parentheses `()` (optional but recommended) and separated by commas. Due to their immutability, they can be hashed and used as dictionary keys:

```python
>>> stock1 = 'MSFT', 95.00, 97.45, 92.45
>>> stock2 = ('MSFT', 95.00, 97.45, 92.45)
>>> stock1 == stock2
True
>>> tupl = ('Tuple', 'is', 'an', 'IMMUTABLE', 'list')
>>> tupl[1:3]
('is', 'an')
```

#### Tuple Methods
Because tuples are immutable, they do not have `append()`, `remove()`, `pop()`, or `extend()` methods. The only available methods are `count()` and `index()`:
```python
>>> tupl.index('list')
4
>>> "is" in tupl
True
>>> tupl.count('is')
1
```

