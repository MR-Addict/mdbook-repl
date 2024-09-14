const languages = ["python", "typescript", "javascript"] as const;

const defaultCodes = {
  python: '# This is default python code\n\nprint("Hello world")',
  typescript: '// This is default typescript code\n\nlet message: string = "Hello, world!";\nconsole.log(message);',
  javascript: '// This is default javascript code\n\nlet message = "Hello, world!";\nconsole.log(message);'
} as const;

export { languages, defaultCodes };
