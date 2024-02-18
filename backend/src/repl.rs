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

fn render_repls(content: &str) -> String {
    // \r? is for windows line endings
    let re = Regex::new(r"(?s)```(py|python)\r?\n(.*?)```").unwrap();

    // if there are no matches, return the content as is
    if !re.is_match(content) {
        return content.to_string();
    }

    // replace all matches with the repl html
    re.replace_all(content, |caps: &regex::Captures| {
        let id = Uuid::new_v4().to_string();
        let lang = caps.get(1).unwrap().as_str();
        let code = caps.get(0).unwrap().as_str().trim();

        if lang == "py" || lang == "python" {
            get_asset("repl.html")
                .replace("{id}", &id)
                .replace("{code}", &code)
                .replace("{lang}", "python")
        } else {
            code.to_string()
        }
    })
    .to_string()
}

impl Preprocessor for Repl {
    fn name(&self) -> &str {
        "mdbook-repl"
    }

    fn run(&self, _ctx: &PreprocessorContext, mut book: Book) -> Result<Book, Error> {
        book.for_each_mut(|item| {
            if let mdbook::book::BookItem::Chapter(chapter) = item {
                chapter.content = render_repls(&chapter.content);
                chapter.content.push_str(&get_asset("script.html"));
                chapter.content.insert_str(0, &get_asset("style.html"));
            }
        });
        Ok(book)
    }
}
