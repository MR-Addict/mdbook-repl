# Usage

This preprocessor is designed to be used with [mdbook](https://rust-lang.github.io/mdBook). If you want to use this repl in your own web project, you can have a look at [For Developers](for-developers.md) section.

## Installation

There two ways to install this preprocessor.

You can install it with **cargo** if you have [rust](https://www.rust-lang.org) installed:

```sh
cargo install mdbook-repl
```

Or you can download the pre built **binary** from [github release page](https://github.com/MR-Addict/mdbook-repl/releases). You should put the binary in your machine's **PATH** after installation.

You can check your installation by running:

```sh
mdbook-repl --version
```

## Configuration

After installation, you need to add some configurations to your **book.toml** file. Below is an example of the full configuration options for this preprocessor:

```toml
[preprocessor.repl]
# iframe url, default is https://mr-addict.github.io/mdbook-repl/embed/
src = "https://mr-addict.github.io/mdbook-repl/embed/"

# python is disabled by default and loading is lazy
python.enable = true
python.loading = "lazy"

# typescript is disabled by default and loading is lazy
typescript.enable = true
typescript.loading = "lazy"

# javascript is disabled by default and loading is lazy
javascript.enable = true
javascript.loading = "lazy"
```

- **src**: The url of the repl iframe, the default value is [https://mr-addict.github.io/mdbook-repl/embed/](https://mr-addict.github.io/mdbook-repl/embed/). You can also deploy your own repl server for better performance, see [For Developers](for-developers.md) section.
- **language.enable**: Enable the language for the repl, default value is **false**.
- **language.loading**: The loading of the language, can be **eager** or **lazy**, default value is **lazy**.

For example if you only care about python codeblock, you can only enable python and disable the others:

```toml
[preprocessor.repl]
python.enable = true
```

## Options

You can also specific some options for the each codeblock.

**readonly**

readonly option will make the codeblock not editable. You can use this option if you want to show some code examples that should not be changed.

<pre><code class="language-markdown">&#96;&#96;&#96;javascript,readonly
// javascript codeblock

console.log("Hello, world!");
&#96;&#96;&#96;</code></pre>

And the codeblock will not be eidtable:

```javascript,readonly
// javascript codeblock

console.log("Hello, world!");
```

**norepl**

norepl option will make the codeblock not rendered by the preprocessor. You can use this option if you want to show some code examples that should not be executed.

<pre><code class="language-markdown">&#96;&#96;&#96;javascript,norepl
// javascript codeblock

console.log("Hello, world!");
&#96;&#96;&#96;</code></pre>

And it will not be rendered by this preprocessor:

```javascript,norepl
// javascript codeblock

console.log("Hello, world!");
```

## Shortcuts

You can use **CTRL** + **R** to run the codeblock. This is useful when you want to run the codeblock without clicking the run button.

## Language Extensions

This preprocessor only recongnizes specific extensions for sepecific language. For example, you can only use **python** or **py** codeblock for python code.

Here is the full list of extensions:

| Language   | Extensions     |
| :--------- | :------------- |
| Python     | python, py     |
| TypeScript | typescript, ts |
| JavaScript | javascript, js |

## Performance

There is no doubt that the execution of the code is really fast compared with backend server playgrounds. However, the bottleneck is the loading time of the codeblock. The loading time is depending on language.

The smallest one is **javascrpt**, because javascipt is natively supported by the browser. However others languages like python and typescript need some complied webassembly runtime to be loaded first.

So the loading option is **lazy** and all lanugages are disabled by default. Also, most of the examples in this docs are using **javascript** by default to make the loading time faster.

Below is the relative size of the extra needed runtime for each language:

| Language   | Size  |
| :--------- | :---- |
| Python     | 5.5MB |
| TypeScript | 718kb |
| JavaScript | 0     |
