# Chapter 2: Modules vs. Classes & Objects


#### Modules are like Dictionaries
A Python module is a file containing reusable functions and classes. 
* Modules reside in a folder with an `__init__.py` file in it.
* Modules are imported using the `import` keyword.
* Just like retrieving a value from a dictionary using a string key, modules allow you to access functions and variables using the dot (`.`) operator.

**Dictionary Style vs. Module Style:**
```python
# Dictionary style
employee = {"EmployeID": "Employee Unique Identity!"}
print(employee['EmployeID'])

# Module style (Assume employee.py contains def EmployeID() and Age)
import employee
employee.EmployeID()
print(employee.Age)
```

Common pattern: 
1. Take a key-value style container.
2. Get something out of it by the key's name.
In dictionaries, the key is a string (syntax: `[key]`). In modules, the key is an identifier (syntax: `.key`).

#### Classes are like Modules
A class is a way to take a grouping of functions and data and place them inside a container so you can access them with the dot (`.`) operator.
```python
class employee(object):
    def __init__(self):
        self.Age = "Employee Age is ##"
    def EmployeID(self):
        print("This is just employee unique identity")
```
*Note*: Classes are preferred over modules because they can be reused multiple times without interference, whereas you only have one instance of a module within a program.

#### Objects are like Mini-imports
When you instantiate a class, you get an **object**. Instantiating is like performing a mini-import.
```python
# Class style instantiation
this_obj = employee()
this_obj.EmployeID()
print(this_obj.Age)
```


