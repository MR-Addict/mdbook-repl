# Limitations

There are some limitations to using pyodide.

For example, you can not use the **input** function to get user input. Authogh it is possible to override the **input** function to get user input from the console, but now it is not easy.

For example, the following code will not work:

```python
# This will not work

input('Enter your name: ')
```

And now there is also no easy way for **interrupt** your code, so dont't write bad code!!
