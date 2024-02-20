# Examples

Here are some basic examples of using JavaScript that you can do in this playground.

## Basic Example

```javascript
let message = "Hello, world!";

console.log(message);
```

## Example with Function

```javascript
function greet(name) {
  return "Hello, " + name;
}

console.log(greet("world"));
```

## Example with Class

```javascript
class Greeter {
  constructor(name) {
    this.name = name;
  }

  greet() {
    return "Hello, " + this.name;
  }
}

let g = new Greeter("world");
console.log(g.greet());
```

## Example with Array

```javascript
let squares = Array.from({ length: 10 }, (_, i) => i * i);

console.log(squares);
```

## Example with async/await:

```javascript
async function delay(ms) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  console.log("Start");
  await delay(1000);
  console.log("End");
}

main();
```
