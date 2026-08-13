# Chapter 8: OOP in Python – Classes & Objects

A class bundles together the behavior (functions) and state (variables) of an object.
* **Behavior (OOP Methods)**: Functions defined within a class that define its behavior.
* **State (OOP Attributes)**: Variables defined within a class to store state or values.

* **Class**: A blueprint containing behaviors and attributes.
* **Object / Instance**: A constructed instance of a class exhibiting its behavior.
* **Type**: Indicates the class that the instance belongs to.

```python
>>> var = "Hello, John"
>>> print(type(var))
<class 'str'>
>>> print(var.upper()) # Method 'upper' called on the str object
'HELLO, JOHN'
```

### Creation and Instantiation
```python
class MyClass(object):
    pass

# Instantiating objects
this_obj = MyClass()
that_obj = MyClass()
print(this_obj) # Prints type and hex memory address
```
The argument `object` in class declarations denotes class inheritance. `pass` is used for empty class definitions.

#### Setting Class Variables and Lookup
```python
class MyClass(object):
    var = 9

this_obj = MyClass()
print(this_obj.var) # Prints 9
```
When an attribute is requested, the instance searches itself first and then its class. This is called **attribute lookup**.

