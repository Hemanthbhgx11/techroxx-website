# Chapter 23: OOP in Python – Inheriting from Built-in Types

Your custom classes can inherit directly from built-in types (like `dict` or `list`) to take advantage of their core functionality and customize special behaviors:

```python
class MyDict(dict):
    def __setitem__(self, key, val):
        print('setting a key and value!')
        super().__setitem__(key, val)

dd = MyDict()
dd['a'] = 10 # Prints 'setting a key and value!'
```

Here is a custom list class that overrides `__getitem__` and `__setitem__` to achieve 1-based list indexing instead of standard 0-based indexing:
```python
class Mylist(list):
    def __getitem__(self, index):
        if index == 0:
            raise IndexError
        if index > 0:
            index = index - 1
        return list.__getitem__(self, index)
    
    def __setitem__(self, index, value):
        if index == 0:
            raise IndexError
        if index > 0:
            index = index - 1
        list.__setitem__(self, index, value)

x = Mylist(['a', 'b', 'c'])
print(x[1]) # Returns 'a'
```

