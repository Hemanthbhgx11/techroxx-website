# Chapter 28: OOP in Python – Debugging, Logging & Benchmarking


### PDB – The Python Debugger
The built-in PDB module helps set intentional pause states (breakpoints) using `pdb.set_trace()` to inspect runtime state:

```python
import pdb
x = 9
y = 7
pdb.set_trace() # Breakpoint
total = x + y
```

#### Common PDB Commands
* `type variable_name`: Evaluates and displays variable contents.
* `c` (continue): Resumes execution until the next breakpoint.
* `s` (step): Steps into functions and subroutines.
* `l` (list): Displays surrounding lines of code.
* `n` (next): Advances to the next line.

### Logging
The `logging` module replaces basic print statements with standardized events written at levels of severity:

1. `DEBUG` (`logging.debug()`): Highly granular diagnostic messages.
2. `INFO` (`logging.info()`): Standard execution progress.
3. `WARNING` (`logging.warning()`): Detected non-serious anomalies (default logging level).
4. `ERROR` (`logging.error()`): Serious errors.
5. `CRITICAL` (`logging.critical()`): Fatal runtime issues resulting in termination.

#### Configuration and Logging to Files
```python
import logging

# Log both to a file and configure a datetime format
logging.basicConfig(
    level=logging.DEBUG, 
    filename='logging.log',
    format='%(asctime)s %(levelname)s:%(message)s'
)

logging.info('This should be logged')
```

### Benchmarking with `timeit`
Benchmarking measures how fast code snippets execute to find performance bottlenecks:

```python
import timeit

# Accessing dictionary by index vs get() method
print(timeit.timeit(stmt="mydict['c']", setup="mydict = {'a':5, 'b':10, 'c':15}", number=1000000))
print(timeit.timeit(stmt="mydict.get('c')", setup="mydict = {'a':5, 'b':10, 'c':15}", number=1000000))
```
*Outcome*: Lookup by index subscript is substantially faster than calling `.get()`.


