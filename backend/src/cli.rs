use clap::{Arg, Command};
use mdbook::preprocess::Preprocessor;
use std::{
    io::{self, IsTerminal},
    process,
};

pub struct Cli {
    pub cmd: Command,
}

impl Cli {
    pub fn new() -> Self {
        let cmd = Command::new("mdbook-embedify")
            .version(env!("CARGO_PKG_VERSION"))
            .about("A mdbook embed preprocessor that embeds app to your book")
            .subcommand(
                Command::new("supports")
                    .arg(Arg::new("renderer").required(true))
                    .about("Check whether a renderer is supported by this preprocessor"),
            );

        let matches = cmd.clone().get_matches();
        if !matches.args_present() {
            if io::stdin().is_terminal() {
                cmd.clone().print_help().unwrap();
                process::exit(1);
            }
        }

        Self { cmd }
    }

    pub fn reply_supports(&self, pre: &dyn Preprocessor) {
        let matches = self.cmd.clone().get_matches();
        if let Some(sub_args) = matches.subcommand_matches("supports") {
            // get the renderer
            let renderer = sub_args.get_one::<String>("renderer").unwrap();

            // signal whether the renderer is supported by exiting with 1 or 0.
            if pre.supports_renderer(renderer) {
                process::exit(0);
            } else {
                process::exit(1);
            }
        }
    }
}
