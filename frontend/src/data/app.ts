const languages = ["python", "typescript", "javascript"] as const;

const defaultCodes = {
  python: '# Default python code\n\nprint("Hello, python")',
  typescript: '// Default typescript code\n\nlet message: string = "Hello, typescript!";\nconsole.log(message);',
  javascript: '// Default javascript code\n\nlet message = "Hello, javascript!";\nconsole.log(message);'
} as const;

export { languages, defaultCodes };
