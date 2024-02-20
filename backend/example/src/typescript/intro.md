# Typescript

Typescript is a superset of JavaScript that adds static typing to the language. It is a powerful tool that can help you write more reliable and maintainable code. Though you can run javascript code in the browser, but younot directly run typescript code in the browser. You need to compile it to javascript first.

So this playground uses [babel/standalone](https://babeljs.io/docs/babel-standalone.html) in service worker to compile typescript code to javascript in the browser. Then execute compiled javascript code in the browser.

```typescript
let message: string = "Hello, world!";

console.log(message);
```
