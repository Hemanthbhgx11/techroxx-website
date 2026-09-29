# Chapter 15: OOP in Python – Method Overloading Alternative

Python does not natively support standard method overloading (defining multiple methods with the same name but different signatures). Instead, use default argument values to handle optional parameters:

```python
class Human:
    def sayHello(self, name=None):
        if name is not None:
            print('Hello ' + name)
        else:
            print('Hello')

obj = Human()
obj.sayHello()       # Outputs "Hello"
obj.sayHello('Rahul') # Outputs "Hello Rahul"
```

### Functions are Objects Too
In Python, functions are first-class objects. They can contain attributes, can be passed as arguments, and returned from functions:
```python
def my_func():
    print('My function was called')
my_func.description = 'A silly function'
```

#### Callable Objects
Any class instance implementing the special `__call__()` method can be invoked using standard function-call syntax:
```python
class CallableClass:
    def __call__(self):
        print("I am called!")
```


## 6. OOP in Python – Inheritance and Polymorphism

