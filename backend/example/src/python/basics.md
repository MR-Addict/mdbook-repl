# Basics

## encode

By default, Python source files are encoded in **UTF-8** and all strings are unicode strings. Of course, you can also specify different encodings for the source code files:

```plaintext
# -*- coding: cp-1252 -*-
```

The above definition allows the use of character encoding from the Windows-1252 character set in the source file, corresponding to Bulgarian, Belarusian, Macedonian, Russian, Serbian.

## comments

Python uses the hash character `#` to start a comment. The comment ends at the end of the line.

```python
# This is a comment

print("Hello, World!")  # This is also a comment
```

## multi-line comments

Python does not have a syntax for multi-line comments, but you can use triple quotes:

```python
"""
This is a comment
written in
more than just one line
"""

print("Hello, World!")
```
