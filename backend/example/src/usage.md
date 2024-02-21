# Usage

This preprocessor is designed to be used with [mdbook](https://rust-lang.github.io/mdBook). If you want to use this repl in your own web project other thatn mdbook, you can have a look at [For Developers](for-developers.md) section.

## Installation

There two ways to install this preprocessor.

You can install it with **cargo** if you have [rust](https://www.rust-lang.org) installed:

```sh
cargo install mdbook-repl
```

Or you can download the pre built **binary** from [github release page](https://github.com/MR-Addict/mdbook-repl/releases). Then you should put the binary in your machine's **PATH**.

You can check your installation by running:

```sh
mdbook-repl --version
```

## Configuration

After you installed the preprocessor, you can use it in your **mdbook** project. Add the following code to your **book.toml**:

```toml
[preprocessor.repl]
# iframe url
src = "https://mr-addict.github.io/mdbook-repl/embed/"

# enable python repl and lazy loading
python.enable = true
python.loading = "lazy"

# enable typescript repl and lazy loading
typescript.enable = true
typescript.loading = "lazy"

# enable javascript repl and lazy loading
javascript.enable = true
javascript.loading = "lazy"
```

The **src** is the url of the repl iframe, the default value is [https://mr-addict.github.io/mdbook-repl/embed/](https://mr-addict.github.io/mdbook-repl/embed/). You can also deploy your own repl server for better performance. You can have a look at [For Developers](for-developers.md) section for more information.

Every language is **disabled** by default for page loading performance. The repl takes some time and resources to render the codeblock, especially for python repl. You can enable the language by setting the **enable** to **true**.

You can also specify the **loading** for the language. which is also considered for page loading performance. It can be **eager** or **lazy**, default value is **lazy**.

For example, if you have a javascript codeblock in your markdown file and you enable it in the **book.toml**:

````markdown
```javascript,norepl
// javascript codeblock

console.log("Hello, world!");
```
````

It will be rendered as real time codeblock in your book.

```javascript
// javascript codeblock

console.log("Hello, world!");
```

## Extensions

This preprocessor only recongnizes specific extensions for sepecific language. For example, you can only use **python** or **py** codeblock for python code.

Here is the full list of extensions:

| Language   | Extensions     |
| :--------- | :------------- |
| Python     | python, py     |
| TypeScript | typescript, ts |
| JavaScript | javascript, js |

## Options

You can also specific some options for the each codeblock. For example, you can specify the **readonly** for the codeblock:

<pre><code>
&#96;&#96;&#96;javascript,readonly
// javascript codeblock

console.log("Hello, world!");
&#96;&#96;&#96;
</code></pre>

And the codeblock will not be eidtable:

```javascript,readonly
// javascript codeblock

console.log("Hello, world!");
```

If you put **norepl** option in the codeblock:

<pre><code>
&#96;&#96;&#96;javascript,norepl
// javascript codeblock

console.log("Hello, world!");
&#96;&#96;&#96;
</code></pre>

And it will not be rendered by this preprocessor:

```javascript,norepl
// javascript codeblock

console.log("Hello, world!");
```
