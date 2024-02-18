# Operators

Python language supports the following types of operators:

- Arithmetic operators
- Comparison operators
- Logical operators
- Bitwise operators
- Assignment operators
- Identity operators
- Membership operators
- Bitwise operators

## arithmetic operators

Arithmetic operators are used with numeric values to perform common mathematical operations:

```python
x = 5

print(x + 3)  # addition

print(x - 3)  # subtraction

print(x * 3)  # multiplication

print(x / 3)  # division

print(x % 3)  # modulus

print(x ** 3)  # exponentiation

print(x // 3)  # floor division
```

## comparison operators

Comparison operators are used to compare two values:

```python
x = 5
y = 3

print(x == y)  # equal

print(x != y)  # not equal

print(x > y)  # greater than

print(x < y)  # less than

print(x >= y)  # greater than or equal to

print(x <= y)  # less than or equal to
```

## logical operators

Logical operators are used to combine conditional statements:

```python
x = 5

print(x > 3 and x < 10)  # and

print(x > 3 or x < 4)  # or

print(not(x > 3 and x < 10))  # not
```

## bitwise operators

Bitwise operators are used to compare (binary) numbers:

```python
x = 5
y = 3

print(x & y)  # AND

print(x | y)  # OR

print(x ^ y)  # XOR

print(~x)  # NOT

print(x << 2)  # Zero fill left shift

print(x >> 2)  # Signed right shift
```

## assignment operators

Assignment operators are used to assign values to variables:

```python
x = 5

x += 3  # x = x + 3

x -= 3  # x = x - 3

x *= 3  # x = x * 3

x /= 3  # x = x / 3

x %= 3  # x = x % 3

x //= 3  # x = x // 3

x **= 3  # x = x ** 3

x &= 3  # x = x & 3

x |= 3  # x = x | 3

x ^= 3  # x = x ^ 3

x >>= 3  # x = x >> 3

x <<= 3  # x = x << 3
```

## identity operators

Identity operators are used to compare the objects, not if they are equal, but if they are actually the same object, with the same memory location:

```python
x = ["apple", "banana"]
y = ["apple", "banana"]

z = x

print(x is z)  # returns True because z is the same object as x

print(x is y)  # returns False because x is not the same object as y, even if they have the same content

print(x == y)  # to demonstrate the difference betweeen "is" and "==": this comparison returns True because x is equal to y
```

## membership operators

Membership operators are used to test if a sequence is presented in an object:

```python
x = ["apple", "banana"]

print("banana" in x)  # returns True because a sequence with the value "banana" is in the list

print("pineapple" not in x)  # returns True because a sequence with the value "pineapple" is not in the list
```

## bitwise operators

Bitwise operators are used to compare (binary) numbers:

```python
x = 5
y = 3

print(x & y)  # AND

print(x | y)  # OR

print(x ^ y)  # XOR

print(~x)  # NOT

print(x << 2)  # Zero fill left shift

print(x >> 2)  # Signed right shift
```
