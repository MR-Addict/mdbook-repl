# For Developers

Actually, you can use repl in your own project other than **mdbook**. What **mdbook-repl** does is to preprocess your markdown python code blocks and replace them with some js and css.

The core of **mdbook-repl** is the iframe. The iframe is used to display the output of the code. The js and css are used to communicate with the iframe.

The iframe url is `https://mr-addict.github.io/mdbook-repl/embed`.

You can use the same technique in your own project.

## API

When the iframe is loaded, it will send a message to the parent window. The message is a json string. The json object has the following properties:

```json
{
  "repl": {
    "id": "",
    "dimensions": {
      "width": 800,
      "height": 600
    },
    "editor": {
      "readonly": false,
      "theme": "light",
      "language": "python",
      "code": "# This is a default python code\n\nprint('Hello world')",
      "defaultCode": "# This is a default python code\n\nprint('Hello world')"
    },
    "output": {
      "msg": "",
      "status": "idle"
    }
  }
}
```

What you should fist do is some basic information to the iframe. You should send current editor **id** and **editor** information to the iframe. The **id** is used to identify the editor for you if you have more that one iframes in you page. At first id would be empty, when you set it, it will send with new id when new information updated. The **editor** information is used to initialize the editor.

The **dimensions** is used to set the width and height of the iframe. You can use the **output** information to display the output of the code.

## Example

Here is an example of how to use the **mdbook-repl** in your own project.

```html
<iframe src="https://mr-addict.github.io/mdbook-repl" width="100%" allow="clipboard-write"></iframe>
<script>
  const id = "ac2f5a2";
  const lang = "python";
  const theme = "light";
  const readonly = false;
  const code = "print('Hello world')";

  const iframe = document.querySelector("iframe");
  const postmessage = (msg) => iframe.contentWindow.postMessage({ repl: msg }, "*");

  window.addEventListener("message", (event) => {
    if (event.source === window || !event.data.repl) return;

    const replData = event.data.repl;

    // update the iframe height when new dimensions updated
    if (replData.id === id) replElement.style.height = replData.dimensions.height + "px";
    // if id is empty, it means the iframe is just loaded
    else if (replData.id === "") postmessage({ id, editor: { theme, language: lang, code, readonly } });
  });
</script>
```

> 💥 Attention
>
> You need to add `allow="clipboard-write"` to the iframe to make the clipboard work.