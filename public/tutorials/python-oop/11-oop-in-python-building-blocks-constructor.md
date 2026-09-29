# Chapter 11: OOP in Python – Init Constructor

The `__init__()` method acts as the class constructor. It is implicitly called when a class is instantiated, allowing you to pass arguments to initialize beginning values.

```python
class myclass(object):
    def __init__(self, aaa, bbb):
        self.a = aaa
        self.b = bbb

x = myclass(4.5, 3)
print(x.a, x.b) # Prints 4.5 3
```

