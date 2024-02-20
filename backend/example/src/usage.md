# Usage

## Installation

There two ways to install this preprocessor.

You can install with **cargo** if you have [rust](https://www.rust-lang.org) installed:

```sh
cargo install mdbook-repl
```

Or you can download the **binary** from [release page](https://github.com/MR-Addict/mdbook-repl/releases). Then you can put the binary in your **PATH**.

You can check if the installation is successful by running:

```sh
mdbook-repl --version
```

## Configuration

After you installed the preprocessor, you can use it in your **mdbook** project. You need to add the following code to your **book.toml**, so that **mdbook** can use this preprocessor to preprocess your markdown files.

```toml
[preprocessor.repl]
python.enable = true
python.loading = "lazy"

typescript.enable = true
typescript.loading = "lazy"

javascript.enable = true
javascript.loading = "lazy"

```

Which means you enable the preprocessor for python codeblock, and the python codeblock will be loaded lazily. You can also specify the **loading** to **eager**, but it's not recommended.

After that, all your markdown files that contain python codeblock will be processed by this preprocessor. It's just like magic.

For example, you can write a python codeblock in your markdown file:

````markdown
```python,norepl
# Python codeblock

print("Hello, world!")
```
````

After you build your **mdbook**, the codeblock will be rendered by preprocessor.

```python
# Python codeblock

print("Hello, world!")
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

You can also specific some options for the codeblock. For example, you can specify the **readonly** for the codeblock, so that the codeblock will not be eidtable.

<pre><code>
&#96;&#96;&#96;python,readonly
print("This is a readonly python codeblock")
&#96;&#96;&#96;
</code></pre>

You can test below codeblock to see the result.

```python,readonly
print("This is a readonly python codeblock")
```

And if you put **norepl** in the codeblock, the codeblock will not be rendered by this preprocessor.

<pre><code>
&#96;&#96;&#96;python,norepl
print("This is codeblock will not be rendered")
&#96;&#96;&#96;
</code></pre>

You can test below codeblock to see the result.

```python,norepl
print("This is codeblock will not be rendered")
```
