# Examples

Here are some basic examples of using Python that you can do in this playground.

## Basic Example

```python
message = "Hello, world!"

print(message)
```

## Example with Function

```python
def greet(name):
    return "Hello, " + name

print(greet("world"))
```

## Example with Class

```python
class Greeter:
    def __init__(self, name):
        self.name = name

    def greet(self):
        return "Hello, " + self.name

g = Greeter("world")
print(g.greet())
```

## Example with List Comprehension

```python
squares = [x * x for x in range(10)]

print(squares)
```

## Example with async/await:

```python
import asyncio

async def delay(ms):
    await asyncio.sleep(ms / 1000)

async def main():
    print("Start")
    await delay(1000)
    print("End")

await main()
```
