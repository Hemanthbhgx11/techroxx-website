# Chapter 25: OOP in Python – Files & Strings


### Strings
Strings are immutable collections of Unicode characters.

#### String Manipulation Methods
* `isalpha()`: Checks if all characters are alphabetic.
* `isdigit()`: Checks if all characters are digits.
* `isdecimal()`: Checks for decimal characters.
* `isnumeric()`: Checks for numeric characters.
* `find(substring)`: Returns the lowest index where the substring is found.
* `istitle()`: Checks if the string is titlecased.
* `join(iterable)`: Concatenates an iterable of strings.
* `lower()`: Returns lowercase version.
* `upper()`: Returns uppercase version.
* `split(sep)`: Splices the string into a list by separator.
* `partition(sep)`: Splits string by separator into a tuple of 3 items (before, separator, after).

```python
>>> str1 = 'Hello World!'
>>> str1.startswith('H')
True
>>> str1.find('lo')
3
>>> str1.upper()
'HELLO WORLD!'
>>> s = 'hello How Are You'
>>> s.split(' ')
['hello', 'How', 'Are', 'You']
```

#### String Formatting in Python 3.x
Use the `.format()` method with curly braces `{}` as placeholders. It supports padding, alignment, truncating, and displaying dates:

```python
>>> '{} {}'.format('Example', 'One')
'Example One'
>>> '{1} {0}'.format('pie', '3.14159') # Reordering indices
'3.14159 pie'
>>> '{:*^12}'.format('PYTHON') # Padding and aligning center
'***PYTHON***'
>>> '{:.15}'.format('PYTHON OBJECT ORIENTED PROGRAMMING') # Truncating
'PYTHON OBJECT O'
```

#### Unicode and Byte Conversions
Operating systems represent files as raw sequences of bytes, while Python strings are Unicode characters. Convert between them using:
* **Encoding (Text to Bytes)**: `.encode(encoding='utf-8')`
* **Decoding (Bytes to Text)**: `.decode(encoding='utf-8')`

```python
>>> x = 'TutorialsPoint'
>>> y = b'TutorialsPoint'
>>> z = x.encode('ASCII')
>>> z == y
True
```


