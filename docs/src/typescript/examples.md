# Examples

Here are some basic examples of using TypeScript that you can do in this playground.

## Basic Example

```typescript
let message: string = "Hello, world!";

console.log(message);
```

## Example with Function

```typescript
function greet(name: string) {
  return "Hello, " + name;
}

console.log(greet("world"));
```

## Example with Interface

```typescript
interface Person {
  first: string;
  last: string;
}

function greeter(person: Person) {
  return "Hello, " + person.first + " " + person.last;
}

console.log(greeter({ first: "Jane", last: "Doe" }));
```

## async/await:

```typescript
async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  console.log("Start");
  await delay(1000);
  console.log("End");
}

main();
```
