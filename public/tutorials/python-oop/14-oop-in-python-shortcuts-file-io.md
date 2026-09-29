# Chapter 14: OOP in Python – File I/O Abstraction

Python wraps the operating system's raw file handling interfaces in a convenient file object abstraction.

#### `open(filename, mode)`
Opens a file and returns a file handle. The modes are:
* `'r'`: Read-only (default).
* `'w'`: Write (erases existing file with the same name).
* `'a'`: Append (automatically adds written data to the end).
* `'r+'`: Read and write.
* Add `'b'` (e.g. `'rb'`, `'wb'`) to process files in binary mode on Windows.

#### Reading and Writing Methods
* `read()`: Returns the entire file contents as a string or bytes.
* `readline()`: Reads a single line.
* `readlines()`: Returns a list of lines.
* `write(string)`: Writes a string (or bytes) to the file.
* `writelines(sequence)`: Writes a sequence of strings without automatically appending newlines.
* `close()`: Flushes buffered writes and releases file descriptors back to the OS.

*Tip*: For large files, loop directly over the file object to conserve memory:
```python
for line in open('fileone', 'r'):
    print(line)
```

