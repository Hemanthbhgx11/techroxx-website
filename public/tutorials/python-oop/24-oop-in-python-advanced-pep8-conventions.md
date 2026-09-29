# Chapter 24: OOP in Python – PEP8 Naming & Privacy

PEP8 is Python's official style guide written by Guido van Rossum. It outlines naming conventions to ensure consistency and readability:
* **Module Names**: `all_lower_case` (separated by underscores if needed)
* **Class Names**: `CamelCase`
* **Exception Names**: `CamelCase`
* **Function and Method Names**: `all_lower_case`
* **Variable Names**: `all_lower_case`
* **Constants**: `ALL_UPPER_CASE`

### Variable Privacy and Access Control
There is no enforcement of truly private instance variables in Python. Instead, privacy is handled through prefix conventions:
* **Public**: `regular_lower_case` (intended for external use).
* **Private**: `_single_leading_underscore` (internal use only, not part of public API).
* **Private Mangled Attribute**: `__double_leading_underscore` (automatically mangled with class name, e.g., `_ClassName__attribute`, to prevent subclasses from accidentally overriding it).
* **Magic Attributes**: `__double_underscores__` (pre-defined by Python; use them, don't create them).

```python
class GetSet(object):
    instance_count = 0 # public
    __mangled_name = 'no privacy!' # mangled
    
    def __init__(self, value):
        self._attrval = value # internal private attribute
```


