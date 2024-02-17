use mdbook::{
    book::Book,
    errors::Error,
    preprocess::{Preprocessor, PreprocessorContext},
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

impl Preprocessor for Repl {
    fn name(&self) -> &str {
        "mdbook-repl"
    }

    fn run(&self, _ctx: &PreprocessorContext, mut book: Book) -> Result<Book, Error> {
        book.for_each_mut(|item| {
            if let mdbook::book::BookItem::Chapter(chapter) = item {
                let re = Regex::new(r"```(\w+)\n((?s:.*?))```").unwrap();

                if !re.is_match(&chapter.content) {
                    return;
                }

                chapter.content.push_str(&get_asset("script.html"));
                chapter.content.insert_str(0, &get_asset("style.html"));

                chapter.content = re
                    .replace_all(&chapter.content, |caps: &regex::Captures| {
                        let id = Uuid::new_v4().to_string();
                        let lang = caps.get(1).unwrap().as_str();
                        let code = caps.get(0).unwrap().as_str().trim();

                        if lang == "python" {
                            get_asset("repl.html")
                                .replace("{id}", &id)
                                .replace("{code}", code)
                                .replace("{lang}", "python")
                        } else {
                            code.to_string()
                        }
                    })
                    .to_string()
            }
        });
        Ok(book)
    }
}
