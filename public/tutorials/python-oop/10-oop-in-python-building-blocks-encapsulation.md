# Chapter 10: OOP in Python – Encapsulation

Encapsulation simplifies using an object by hiding internal complexity behind well-defined boundaries. Access to state attributes should ideally happen through specialized **Getter and Setter** methods to ensure validation and secure data access:

```python
class MyClass(object):
    def setAge(self, num):
        self.age = num
    def getAge(self):
        return self.age

zack = MyClass()
zack.setAge(45)
print(zack.getAge()) # Prints 45
```
*Note*: Adding exception handling within setters ensures that only correct and valid data is stored.

