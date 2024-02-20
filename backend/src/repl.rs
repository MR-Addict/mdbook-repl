use crate::cfg;

use mdbook::{
    book::Book,
    errors::Error,
    preprocess::{Preprocessor, PreprocessorContext},
    Config,
};
use regex::Regex;
use rust_embed::RustEmbed;
use uuid::Uuid;

#[derive(RustEmbed)]
#[folder = "assets"]
struct Assets;

pub struct Repl;

impl Repl {
    pub fn new() -> Repl {
        Repl
    }
}

fn get_asset(name: &str) -> String {
    let path = format!("{}", name);
    let file = Assets::get(&path).unwrap();
    std::str::from_utf8(file.data.as_ref()).unwrap().to_string()
}

fn parse_options(options_str: &str) -> Vec<String> {
    options_str
        .split(',')
        .map(|s| s.trim().to_string())
        .collect()
}

fn map_lang(raw_lang: &str) -> &str {
    match raw_lang {
        "py" | "python" => "python",
        "ts" | "typescript" => "typescript",
        "js" | "javascript" => "javascript",
        _ => "python",
    }
}

fn render_repls(content: &str, config: &Config) -> (bool, String) {
    // \r? is for windows line endings
    let langs = r"\bpy\b|\bpython\b|\bts\b|\btypescript\b|\bjs\b|\bjavascript\b";
    let re = Regex::new(&format!(r"(?s)```({}),?(.*?)\r?\n(.*?)```", langs)).unwrap();

    // if there are no matches, return the content as is
    if !re.is_match(content) {
        return (false, content.to_string());
    }

    // replace all matches with the repl html
    let rendered = re
        .replace_all(content, |caps: &regex::Captures| {
            let id = Uuid::new_v4().to_string();
            let code = caps.get(3).map(|m| m.as_str()).unwrap_or("").trim();
            let raw_lang = caps.get(1).map(|m| m.as_str()).unwrap_or("").trim();

            let lang = map_lang(raw_lang);
            let codeblock = format!("```{}\n{}\n```", lang, code);
            let options_str = caps.get(2).map(|m| m.as_str()).unwrap_or("");
            let options = parse_options(options_str);
            let readonly = options.contains(&"readonly".to_string());

            // get the config options
            let enable = cfg::get_config_bool(config, &format!("{}.enable", lang), true);
            let loading = cfg::get_config_string(config, &format!("{}.lazy", lang), "lazy");

            // if norepl is in the options, return the code block as is
            if !enable || options.contains(&"norepl".to_string()) {
                return codeblock;
            }

            get_asset("repl.html")
                .replace("{id}", &id)
                .replace("{lang}", lang)
                .replace("{loading}", &loading)
                .replace("{codeblock}", &codeblock)
                .replace("{readonly}", if readonly { "true" } else { "false" })
        })
        .to_string();

    (true, rendered)
}

impl Preprocessor for Repl {
    fn name(&self) -> &str {
        "mdbook-repl"
    }

    fn run(&self, ctx: &PreprocessorContext, mut book: Book) -> Result<Book, Error> {
        let config = &ctx.config;

        book.for_each_mut(|item| {
            if let mdbook::book::BookItem::Chapter(chapter) = item {
                let (repl_found, rendered) = render_repls(&chapter.content, config);
                if repl_found {
                    chapter.content = rendered;
                    chapter.content.push_str(&get_asset("script.html"));
                    chapter.content.insert_str(0, &get_asset("style.html"));
                }
            }
        });
        Ok(book)
    }
}
