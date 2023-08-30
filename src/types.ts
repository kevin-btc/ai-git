export interface Config {
  polyfactToken: string;
  endpoint: string;
  modelName: string;
  maxTokensInResponse: number;
  language: string;
  excludeFromDiff?: string[];
  diffFilter?: string;
}

export interface CommitConfig extends Config {
  systemMessageCommitPrompt: string;
  autocommit?: boolean;
  openCommitTextEditor?: boolean;
}

export interface IssueConfig extends Config {
  systemMessageIssuePrompt: string;
  githubToken?: string;
}
