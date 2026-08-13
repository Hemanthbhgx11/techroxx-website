# Chapter 9: OOP in Python – Instance Methods

An instance method is a function defined inside a class that requires an instance to be called. The first parameter of an instance method is always `self`.

```python
class MyClass(object):
    var = 9
    def firstM(self):
        print("hello, World")
        print(self)

obj = MyClass()
obj.firstM()
```

