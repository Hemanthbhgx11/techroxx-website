# Chapter 27: OOP in Python – Object Serialization


Serialization is the process of translating data structures or object state into a format (like a file or byte stream) that can be saved or transmitted and reconstructed later (deserialization).

### Pickle
Pickling converts a Python object hierarchy into an unreadable byte stream.
* **Capabilities**: Easily pickling nested dictionaries and lists; preserves and restores object attributes to their exact state.
* **Limitations**: Does not save class code, only attribute state; cannot store file handles or connection sockets.

#### Pickle Interface Methods
* `pickle.dump(obj, file)`: Serializes object to an open file.
* `pickle.dumps(obj)`: Serializes object to a string of bytes.
* `pickle.load(file)`: Deserializes object from an open file.
* `pickle.loads(bytes)`: Deserializes object from a bytes array.

```python
import pickle

class Cat(object):
    def __init__(self, color):
        self.color = color
        self.number_of_legs = 4

pussy = Cat("White")
pickled_pussy = pickle.dumps(pussy) # Serializes to bytes
print(pickled_pussy)

# Unpickling
meow = pickle.loads(pickled_pussy)
print(meow.color) # Prints 'White'
```

### JSON (JavaScript Object Notation)
JSON is a lightweight, human-readable data-interchange format ideal for configurations and API communication.

```python
import json

# Python Dict to JSON string
data = {"EmployID": 40203, "Name": "Zack", "Age": 54, "isEmployed": True}
json_string = json.dumps(data)

# JSON string back to Python Dict
parsed_data = json.loads(json_string)
```

Formatting JSON cleanly with spacing:
```python
json.dump(conf, fh, indent=4, separators=(',', ': '))
```

### YAML
YAML is a human-friendly alternative to JSON. It uses whitespace indentation rather than brackets to represent hierarchical structures. Relational data is expressed using anchors (`&`) and aliases (`*`).

#### Installation
YAML is not part of the standard library. Install `pyaml` via terminal:
```bash
pip install pyaml       # On Windows
sudo pip install pyaml  # On macOS/Linux
```

#### Reading and Writing YAML
```python
import yaml

mydict = {'a': 2, 'b': 4}
print(yaml.dump(mydict, default_flow_style=False)) # Dumps structured YAML

# Loading YAML
with open('eRecord.yaml') as fh:
    struct = yaml.load(fh, Loader=yaml.FullLoader)
```


