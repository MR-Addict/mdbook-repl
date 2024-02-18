# Usage

## Basics

After you installed the preprocessor, you can use it in your **mdbook** project. You need to add the following code to your **book.toml**, so that **mdbook** can use this preprocessor to preprocess your markdown files.

```toml
[preprocessor.repl]
```

After that, all your markdown files that contain python codeblock will be processed by this preprocessor. It's just like magic.

For example, you can write a python codeblock in your markdown file:

````markdown
```python,norepl
# Python codeblock

print("Hello, world!")
```
````

After you build your **mdbook**, the codeblock will be replaced by the output of the code.

```python
# Python codeblock

print("Hello, world!")
```

## Extensions

This preprocessor only recongnizes specific extensions for sepecific language. For example, you can only use **python** or **py** codeblock for python code.

## Options

You can also specific some options for the codeblock. For example, you can specify the **readonly** for the codeblock, so that the codeblock will not be eidtable.

<pre><code>
&#96;&#96;&#96;python, readonly
print("This is a readonly python codeblock")
&#96;&#96;&#96;
</code></pre>

You can test below codeblock to see the result.

```python, readonly
print("This is a readonly python codeblock")
```

And if you put **norepl** in the codeblock, the codeblock will not be rendered by this preprocessor.

<pre><code>
&#96;&#96;&#96;python, norepl
print("This is codeblock will not be rendered")
&#96;&#96;&#96;
</code></pre>

You can test below codeblock to see the result.

```python, norepl
print("This is codeblock will not be rendered")
```
