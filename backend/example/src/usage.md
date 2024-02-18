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

## Usage

After you have installed the preprocessor, you can use it in your **mdbook** project. You need to add the following code to your **book.toml**, so that **mdbook** can use this preprocessor to preprocess your markdown files.

```toml
[preprocessor.mdbook-repl]
```

After that, all your markdown files that contain python codeblock will be processed by this preprocessor. It's just like magic.

For example, you can write a python codeblock in your markdown file:

```python
# Python codeblock

print("Hello, world!")
```

After you build your **mdbook**, the codeblock will be replaced by the output of the code.

## Extensions

This preprocessor only recongnizes specific extensions for sepecific language. For example, you can only use `python` or `py` codeblock for python code.

Below is a list of supported extensions for each language:

| Language | Codeblock      |
| :------- | :------------- |
| Python   | `python`, `py` |
