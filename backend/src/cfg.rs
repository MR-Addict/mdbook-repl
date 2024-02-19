use mdbook::Config;

pub fn get_config_bool(config: &Config, key: &str) -> bool {
    config
        .get(format!("preprocessor.repl.{}", key).as_str())
        .and_then(|v| v.as_bool())
        .unwrap_or(false)
}

pub fn get_config_string(config: &Config, key: &str, default: &str) -> String {
    config
        .get(format!("preprocessor.repl.{}", key).as_str())
        .and_then(|v| v.as_str())
        .unwrap_or(default)
        .to_string()
}
