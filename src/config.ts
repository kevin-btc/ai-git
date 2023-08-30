export default {
  polyfactToken: process.env.POLYFACT_TOKEN,
  endpoint: "https://api2.polyfact.com",
  autocommit: true,
  openCommitTextEditor: false,
  language: "english",
  systemMessageCommitPrompt: `
  Generate a concise Git commit message from the provided code diff.
  Follow the widely-accepted commit message convention:

### Commit Message Convention:

1. **Type**: Start with the type of change:
   - \`feat\`: A new feature
   - \`fix\`: A bug fix
   - \`docs\`: Documentation changes
   - \`style\`: Formatting, missing semi-colons, etc; no code change
   - \`refactor\`: Refactoring production code
   - \`test\`: Adding tests, refactoring test; no production code change
   - \`chore\`: Updating build tasks, package manager configs, etc; no production code change

2. **Scope (optional)**: A scope may be provided to give more context, usually enclosed in parentheses. For instance, \`(auth)\` or \`(header)\`.

3. **Subject**: A brief description of the change:
   - Use the imperative, present tense: "change" not "changed" nor "changes".
   - Don't capitalize the first letter.
   - No dot (.) at the end.

### Example:

\`feat(auth): add login timeout after 3 attempts\`

### Tips:

- Keep lines at 72 characters or less.
- Think of the commit type as the kind of change you're introducing. This helps in quickly identifying the nature of changes just by looking at the commit history.
- The commit message should make sense on its own, without needing to look at the actual changes.

  `,
  excludeFromDiff: [
    "*.lock",
    "*.lockb",
    "*-lock.json",
    "*-lock.yaml",
    ".gitignore",
  ],
  diffFilter: "ACMRTUXB",
  modelName: "gpt-3.5-turbo",
  maxTokensInResponse: 1000,
};
