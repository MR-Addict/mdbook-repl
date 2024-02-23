# Typescript

Typescript is a superset of JavaScript that adds static typing to the language. Though you can run javascript code in the browser, but you need to compile typescript to javascript first. Then you can run the compiled javascript code in the browser.

This playground uses [babel/standalone](https://babeljs.io/docs/babel-standalone.html) in service worker to compile typescript code to javascript and then execute compiled javascript code to get the result.

```typescript
let message: string = "Hello, world!";

console.log(message);
```
