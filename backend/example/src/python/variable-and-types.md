# Variable and Types

## variables

Python has no command for declaring a variable. A variable is created the moment you first assign a value to it.

```python
x = 5
y = "John"

print(x)
print(y)
```

Variables do not need to be declared with any particular type and can even change type after they have been set.

```python
x = 4  # x is of type int
print(x)

x = "Sally"  # x is now of type str
print(x)
```

## data types

Python has the following data types built-in by default, in these categories:

- Text Type: `str`
- Numeric Types: `int`, `float`, `complex`
- Sequence Types: `list`, `tuple`, `range`
- Mapping Type: `dict`
- Set Types: `set`, `frozenset`
- Boolean Type: `bool`
- Binary Types: `bytes`, `bytearray`, `memoryview`
- None Type: `NoneType`
- Type Type: `type`

## numbers

There are three numeric types in Python:

- `int`
- `float`
- `complex`

```python
x = 1  # int
y = 2.8  # float
z = 1j  # complex

print(x)
print(y)
print(z)
```

## strings

Strings in Python are surrounded by either single quotation marks, or double quotation marks.

```python
a = "Hello, World!"
b = 'Hello, World!'

print(a)
print(b)
```

You can assign a multiline string to a variable by using three quotes:

```python
a = """Lorem ipsum dolor sit amet,
consectetur adipiscing elit,
sed do eiusmod tempor incididunt
ut labore et dolore magna aliqua."""

print(a)
```

## booleans

Booleans represent one of two values: `True` or `False`.

```python
print(10 > 9)  # True
print(10 == 9)  # False
print(10 < 9)  # False
```

## lists

Lists are used to store multiple items in a single variable.

```python
thislist = ["apple", "banana", "cherry"]

print(thislist)
```

## tuples

A tuple is a collection which is ordered and unchangeable. In Python tuples are written with round brackets.

```python
thistuple = ("apple", "banana", "cherry")

print(thistuple)
```

## sets

Sets are used to store multiple items in a single variable.

```python
thisset = {"apple", "banana", "cherry"}

print(thisset)
```

## dictionaries

Dictionaries are used to store data values in key:value pairs.

```python
thisdict = {
  "brand": "Ford",
  "model": "Mustang",
  "year": 1964
}

print(thisdict)
```

## type casting

You can specify a variable type by using a constructor function:

```python
x = str(3)  # x will be '3'
y = int(3)  # y will be 3
z = float(3)  # z will be 3.0

print(x)
print(y)
print(z)
```

## None

In Python, the `None` keyword is used to define a null value, or no value at all.

```python

x = None
print(x)
```

## type()

You can get the data type of any object by using the `type()` function:

```python
x = 5

print(type(x))
```

## isinstance()

To check if an object is of a certain data type, you can use the `isinstance()` function:

```python
x = 5

print(isinstance(x, int))
```

## id()

The `id()` function returns a unique id for the specified object.

```python
x = ("apple", "banana", "cherry")

print(id(x))
```
