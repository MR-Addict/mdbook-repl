# Examples

Here are some basic examples of using Lua that you can do in this playground.

## Basic Example

```lua
message = "Hello, world!"

print(message)
```

## Example with Function

```lua
function greet(name)
    return "Hello, " .. name
end

print(greet("world"))
```
## Example with List Comprehension

```lua
squares = {}
for x = 0, 9 do
    squares[x] = x * x
end

print(table.concat(squares,", "))
```

## Example with coroutine:

```lua
co1 = coroutine.create(function ()
    for i=1,5 do
        coroutine.resume(co2)
        print("First coroutine")
    end
end)

co2 = coroutine.create(function ()
    for i=1,5 do
        print("Second coroutine")
        coroutine.yield()
    end
end)

coroutine.resume(co1)
```