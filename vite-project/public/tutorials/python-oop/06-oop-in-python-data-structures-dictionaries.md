# Chapter 6: OOP in Python – Dictionaries

Dictionaries define a one-to-one mapping between keys and values. They are unordered collections enclosed in curly braces `{}`.

```python
>>> # Empty dictionary
>>> my_dict = {}
>>>
>>> # Mixed key dictionary
>>> my_dict = {'name': 'Aarav', 1: [2, 4, 10]}
>>>
>>> # Using built-in dict()
>>> my_dict = dict({1: 'msft', 2: 'IT'})
>>>
>>> # Accessing by key
>>> my_dict[1]
'msft'
>>> my_dict['IT']
Traceback (most recent call last):
KeyError: 'IT'
```
*Note*: You cannot retrieve keys using values directly (raises `KeyError`).

#### Modifying and Deleting
Dictionaries do not allow duplicate keys. Setting an existing key replaces its old value.
```python
>>> my_dict[2] = 'Software' # Modifies key 2
>>> my_dict[3] = 'Microsoft Technologies' # Adds new key-value pair
>>>
>>> # Deleting
>>> del my_dict[3] # Deletes individual item by key
>>> my_dict.clear() # Deletes all items
```

