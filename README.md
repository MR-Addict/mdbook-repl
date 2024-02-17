# Mdbook REPL

## TODO

- [x] Allow move ouput
- [x] Automatically update theme
- [x] Communicate with iframe host
- [ ] Implement more languages other than python

## Embed

Simplest way to embed the REPL is to use an iframe. The following example demonstrates how to embed the REPL in an iframe.

```html
<iframe src="https://mr-addict.github.io/mdbook-repl" width="100%" allow="clipboard-write"></iframe>
<script>
  const id = "ac2f5a2a";
  const lang = "python";
  const theme = "light";
  const code = "print('Hello world')";

  const iframe = document.querySelector("iframe");
  const message = { repl: { id, editor: { theme, lang, code, defaultCode: code } } };

  window.addEventListener("message", (event) => {
    if (event.source === window || !event.data.repl) return;

    const repl = event.data.repl;

    if (repl.id === id) replElement.style.height = repl.dimensions.height + "px";
    else if (repl.id === "") iframe.contentWindow.postMessage(message, "*");
  });
</script>
```

## Useful Links

- [ACE Editor](https://ace.c9.io)
- [InfiniteXyy Playcode](https://github.com/InfiniteXyy/playcode)
- [MDN Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Worker)
