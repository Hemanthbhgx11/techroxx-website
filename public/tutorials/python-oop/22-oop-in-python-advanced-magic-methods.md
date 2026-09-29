# Chapter 22: OOP in Python – Core Syntax & Magic Methods

Python allows custom classes to implement special double-underscore ("magic") methods to hook into core language syntax, such as operators or list operations:

* `+` -> `__add__(self, other)`
* `in` -> `__contains__(self, item)`
* `==` -> `__eq__(self, other)`
* `obj[index]` -> `__getitem__(self, index)`
* `obj[start:stop]` -> `__getslice__(self, start, stop)`
* `len(obj)` -> `__len__(self)`
* `print(obj)` -> `__repr__(self)`

```python
class SumList(object):
    def __init__(self, my_list):
        self.mylist = my_list
    def __add__(self, other):
        # Adds items at identical indices together
        new_list = [x + y for x, y in zip(self.mylist, other.mylist)]
        return SumList(new_list)
    def __repr__(self):
        return str(self.mylist)

aa = SumList([3, 6, 9, 12, 15])
bb = SumList([100, 200, 300, 400, 500])
cc = aa + bb # Invokes aa.__add__(bb)
print(cc)    # Prints [103, 206, 309, 412, 515]
```

