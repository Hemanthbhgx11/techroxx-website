# Chapter 12: OOP in Python – Attributes

* **Class Attributes**: Defined in the class body. They belong to the class itself, are shared by all instances, and are not prefixed with `self`. Can be accessed via `ClassName.attribute` or `instance.attribute`.
* **Instance Attributes**: Created and manipulated inside methods using `self.attribute`. They are unique to each instance.

#### Class Attribute Overriding and Lookup
```python
>>> class myclass(object):
...     classy = 'class value'
...
>>> dd = myclass()
>>> dd.classy = "Instance Value" # Overrides attribute in instance
>>> print(dd.classy)
'Instance Value'
>>> del dd.classy # Deletes instance attribute, lookup falls back to class
>>> print(dd.classy)
'class value'
```

### Working with Class and Instance Data
Class data is shared among all instances. A change to class data applies across all instances.

```python
class InstanceCounter(object):
    count = 0 # Class attribute tracking total instances
    def __init__(self, val):
        self.val = val
        InstanceCounter.count += 1
    def set_val(self, newval):
        self.val = newval
    def get_val(self):
        return self.val
    def get_count(self):
        return InstanceCounter.count

a = InstanceCounter(9)
b = InstanceCounter(18)
c = InstanceCounter(27)
for obj in (a, b, c):
    print('val of obj: %s' % (obj.get_val()))
    print('count: %s' % (obj.get_count())) # Always prints 3
```

You can view attributes using the `__dict__` attribute:
```python
>>> a = myClass()
>>> a.class_method()
>>> print(a.__dict__)
{'instance_attribute': 'I am instance attribute'}
```


## 5. OOP in Python – Object Oriented Shortcuts

