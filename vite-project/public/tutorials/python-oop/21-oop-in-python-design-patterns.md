# Chapter 21: OOP in Python – Design Patterns


### Overview
Software design patterns represent proven, documented templates to solve recurring architectural and coding design problems, improving maintainability, modularity, and extensibility.

### Classification of Design Patterns (Gang of Four - GoF)
1. **Creational Patterns**: Isolate object creation logic from the rest of the application. Includes Abstract Factory, Builder, Factory Method, Prototype, and Singleton. 
   *Note*: Due to Python's highly dynamic nature, creational patterns are less frequently implemented compared to statically typed languages, as Python natively provides object creation flexibility.
2. **Structural Patterns**: Use composition, inheritance, or aggregation to group classes and objects into larger structural systems. Examples include Adapter, Bridge, Composite, Decorator, Facade, Flyweight, and Proxy.
3. **Behavioral Patterns**: Handle communication and message routing between disparate objects. Examples include Visitor, Chain of Responsibility, Command, Interpreter, Iterator, Mediator, Memento, Observer, State, Strategy, and Template Method.

### Singleton Design Pattern
The Singleton pattern restricts class instantiation to a single shared object. It is used when global coordination is needed, such as in configuration managers, connection pooling, and loggers.

You can implement a Singleton in Python by overriding the special `__new__` method:

```python
class Logger(object):
    def __new__(cls, *args, **kwargs):
        if not hasattr(cls, '_logger'):
            # Create instance using super call only if it doesn't exist
            cls._logger = super(Logger, cls).__new__(cls, *args, **kwargs)
        return cls._logger

obj1 = Logger()
obj2 = Logger()
print(obj1 == obj2) # Prints True
print(obj1)         # Both point to the exact same hex address
```


## 8. OOP in Python – Advanced Features

