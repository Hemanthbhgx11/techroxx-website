# Chapter 26: OOP in Python – Exceptions & Custom Classes


An exception indicates any unusual or erroneous condition. Exception handling enables your application to deal with errors gracefully.

### Common Exception Types
* `ZeroDivisionError`: Raised when dividing by zero (e.g., `1/0`).
* `NameError`: Misspelling variable or function names.
* `SyntaxError`: Code parsing errors (e.g. unclosed string quotes).
* `KeyError`: Looking up a non-existent dictionary key.
* `IndexError`: Accessing an out-of-bounds list index.

### Catching Exceptions
Trap exceptions using `try` and `except` blocks to handle errors without crashing the program:

```python
import sys
try:
    number = int(input('Enter number between 1 & 10: '))
except ValueError:
    print('Error.. numbers only')
    sys.exit()
```

### Raising Exceptions
Manually trigger errors using the `raise` keyword:
```python
def enterAge(age):
    if age < 0:
        raise ValueError('Only positive integers are allowed')
```

### Creating Custom Exception Classes
Define custom exceptions by inheriting from the built-in `BaseException` class or any of its subclasses (like `Exception` or `RuntimeError`):

```python
# NegativeNumberException.py
class NegativeNumberException(RuntimeError):
    def __init__(self, age):
        super().__init__()
        self.age = age

# Using the exception
from NegativeNumberException import NegativeNumberException
def enterage(age):
    if age < 0:
        raise NegativeNumberException('Only positive integers are allowed')
```

Another clean implementation:
```python
class customException(Exception):
    def __init__(self, value):
        self.parameter = value
    def __str__(self):
        return repr(self.parameter)

try:
    raise customException('My Useful Error Message!')
except customException as instance:
    print('Caught: ' + instance.parameter)
```

### Exception Hierarchy Table
The partial built-in exception hierarchy is as follows:
* `BaseException`
  * `SystemExit`
  * `KeyboardInterrupt`
  * `GeneratorExit`
  * `Exception`
    * `StopIteration`
    * `ArithmeticError`
      * `ZeroDivisionError`
      * `OverflowError`
    * `AssertionError`
    * `AttributeError`
    * `LookupError`
      * `IndexError`
      * `KeyError`
    * `NameError`
    * `OSError`
      * `FileNotFoundError`
      * `PermissionError`
    * `RuntimeError`
    * `TypeError`
    * `ValueError`
    * `Warning`


