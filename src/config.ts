export default {
  polyfactToken: process.env.POLYFACT_TOKEN,
  autocommit: true,
  openCommitTextEditor: false,
  language: "english",
  systemMessageCommitPrompt: `
    You are expert AI, your job is to write clear and concise Issue.
    Your responsibility is to ensure that these messages accurately describe the changes made in each commit,
    follow established guidelines. Provide a clear history of changes to the codebase.
    Write 1 sentences. Output only the commit message without comments or other text.`,
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
