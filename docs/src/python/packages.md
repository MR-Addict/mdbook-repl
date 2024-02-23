# Packages

There are many built-in [packages](https://pyodide.org/en/stable/usage/packages-in-pyodide.html) available in pyodide. You should have a look at the list of packages before you use them.

For example, you can use **regex** pakcage to match a pattern in a string:

```python
import regex

pattern = r'(\d{4})-(\d{2})-(\d{2})'

match = regex.match(pattern, '2022-12-31')

print(match.groups())
```

It may take some time when you first import a package, but after that, it should be faster.

And here is another example of using **numpy** package to calculate the mean of a list of numbers:

```python
import numpy as np

numbers = [1, 2, 3, 4, 5]

mean = np.mean(numbers)

print(mean)
```

> Attention 💥
>
> Some of the packages may not work as expected due to the limitations of browser environment.
