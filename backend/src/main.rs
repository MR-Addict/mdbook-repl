mod cli;
mod repl;

use mdbook::preprocess::{CmdPreprocessor, Preprocessor};
use std::io;

fn main() {
    let cli = cli::Cli::new();
    let repl = repl::Repl::new();

    // reply --supports command line argument
    cli.reply_supports(&repl);

    let (ctx, book) = CmdPreprocessor::parse_input(io::stdin()).unwrap();
    let result = repl.run(&ctx, book).unwrap();

    // Write the result to stdout
    serde_json::to_writer(io::stdout(), &result).unwrap();
}
