# For Developers

Actually, you can use repl in your own web project other than **mdbook**. What **mdbook-repl** does is to preprocess your markdown code blocks and replace them with some js and css.

The core of **mdbook-repl** is the iframe. The iframe is used to display the output of the code. The js and css are used to communicate with the iframe.

The iframe url is [https://mr-addict.github.io/mdbook-repl/embed/](https://mr-addict.github.io/mdbook-repl/embed/). You can also deploy the iframe in your own server. You can find the source code of the iframe in the [github repository](https://github.com/MR-Addict/mdbook-repl/tree/gh-pages/embed).

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
      "data": [],
      "status": "loading"
    }
  }
}
```

What you should do fist is to send some basic information to the iframe including **id** and **editor** data. The **id** is used to identify the editor if you have more that one iframes in you page. The id is empty at first. When new information updated, id will be sent with it. The **editor** information is used to initialize the editor.

The **dimensions** is used to set the width and height of the iframe. The **output** data is used to display the output of the code. The **status** can be **idle**, **loading**, **running** or **finished**. The **data** is an array of objects. Each object has a **color** and **msg**. The **color** is used to set the color of the message which can be **normal** or **red**. The **msg** is used to display the message.

## Example

Here is an example of how to use the **mdbook-repl** in your own project:

```html
<style>
  iframe {
    border: none;
    width: 100%;
  }
</style>
<iframe src="http://localhost:4173/" width="100%" allow="clipboard-write"></iframe>
<script>
  const id = "ac2f5a2";
  const lang = "python";
  const theme = "light";
  const readonly = false;
  const code = "# Python\n\nprint('Hello world')";

  const iframe = document.querySelector("iframe");

  const postmessage = (msg) => iframe.contentWindow.postMessage({ repl: msg }, "*");

  window.addEventListener("message", (event) => {
    const replData = event.data.repl;
    if (event.source === window || !replData) return;

    // if the id is empty, then it's the first time the iframe is loaded
    if (replData.id === "") {
      postmessage({ id, editor: { theme, lang, code, readonly, defaultCode: code } });
      return;
    }

    if (replData.id !== id) return;

    // update the iframe height
    iframe.style.height = replData.dimensions.height + "px";
  });
</script>
```

> 💥 Attention
>
> You need to add `allow="clipboard-write"` to the iframe to make the clipboard work.
