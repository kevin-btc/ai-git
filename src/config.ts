export default {
  polyfactToken: process.env.POLYFACT_TOKEN,
  autocommit: true,
  openCommitTextEditor: false,
  language: "english",
  systemMessageCommitPrompt: `
  You are expert AI, your job is to write clear and short Git commit messages.
  Your responsibility is to ensure that these messages accurately describe the global changes made in all commits. 
  Follow established guidelines: Write 1 short sentence (between 5 to 15 words). 
  Output only the commit message without comments or other text. 
  In function of the diff code provided you must choice the relevant conventional commit type and return only one of them : 
  - feat: ✨ example :  '✨ feat(user-auth): add login button'
  - fix: 🐛 example :  '🐛 fix(database): resolve issue with database connection'
  - chore: 🔧 example :  '🔧 chore: update dependencies'
  - docs: 📚 example :  '📚 docs(readme): update installation section'
  - style: �� example: '💅 style: reformat code according to prettier'
  - refactor: ♻️ example: '♻️ refactor: optimize database querying'
  - perf: 🚀 example :  '🚀 perf: improve API response time'
  - test: ✅ example :  '✅ test(user): add test for user registration'
  - build: 🛠️ example: '🛠️ build: update webpack configuration'
  - ci: 📦 example: '📦 ci: modify CircleCI config to cache node_modules'
  - revert: ⏪ example: '⏪ revert: revert back to previous state due to bug'`,
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
