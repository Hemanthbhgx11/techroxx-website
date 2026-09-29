# Chapter 7: OOP in Python – Sets

Sets are unordered collections with no duplicate elements. While the set itself is mutable (you can add/remove items), the individual items must be immutable. Sets are implemented via hash tables, making membership checking highly optimized.

```python
>>> # Creating a set
>>> my_set = {1, 2, 4, 8}
>>> my_set = {1.0, "Hello World!", (2, 4, 6)} # Set of mixed datatypes
```

#### Set Methods and Operators
* **`add(x)`**: Adds an element to the set.
* **`union(s)` or `|`**: Returns the union of two sets.
* **`intersection(s)` or `&`**: Returns the intersection of two sets.
* **`difference(s)` or `-`**: Returns the elements in the invoking set but not in the second set.
* **`isdisjoint(s)`**: Checks if two sets have nothing in common.
* **`issuperset(s)` or `>`**: Checks if a set is a superset of another.
* **`issubset(s)` or `<`**: Checks if a set is a subset of another.
* **`clear()`**: Empties the set.

```python
>>> topics = {'Python', 'Java', 'C#'}
>>> topics.add('C++')
>>> team = {'Developer', 'Content Writer', 'Editor', 'Tester'}
>>> group = topics.union(team)
>>> topics.intersection(team)
set()
>>> topics.difference(team)
{'Python', 'C++', 'Java', 'C#'}
```


## 4. OOP in Python – Building Blocks

