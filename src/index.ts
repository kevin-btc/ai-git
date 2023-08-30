import { Command, program } from "commander";
import { autoCommit } from "./autocommit";
import { writeFileSync, existsSync } from "fs";

import defaultConfig from "./config.js";
import rc from "rc";
import { CommitConfig } from "./types";

const customConfig = rc("ai-git", {});

const createCustomConfigFile = () => {
  const filePath = "./.ai-gitrc";
  if (existsSync(filePath)) {
    console.error(
      ".ai-git config file already exists. If you want to overwrite it, please delete or rename the existing file first."
    );
    return;
  }
  writeFileSync(filePath, JSON.stringify(defaultConfig, null, 2));
  console.info(
    ".ai-gitrc config file has been created with default values. You can now customize it as needed.",
    "\nDon't forget to add .ai-gitrc to your .gitignore file."
  );
};

const applyGlobalOptions = (command: Command) => {
  return command
    .option("-t, --token <type>", "Set POLYFACT_TOKEN")
    .option("-e, --endpoint <url>", "Set API Endpoint")
    .option("-m, --model <type>", "Set Model Name")
    .option("--maxTokens <number>", "Set Max Tokens In Response")
    .option("-l, --language <type>", "Language")
    .option("-p, --prompt <prompt>", "System Message Prompt")
    .option("--exclude <items>", "Exclude patterns from diff", (val) =>
      val.split(",")
    )
    .option("--filter <type>", "Diff Filter");
};

program
  .command("init-config")
  .description("Create a custom config file for ai-git")
  .action(createCustomConfigFile);

applyGlobalOptions(program)
  .name("ai-git")
  .command("commit")
  .description("Automatically generate a commit message using AI")

  .option("--template <type>", "System Message Prompt Template")
  .option("--autocommit", "Enable auto commit")
  .option("--editor", "Open Commit Text Editor after commit")
  .option("--filter <type>", "Diff Filter")
  .action((options) => {
    const config: CommitConfig = {
      polyfactToken:
        options.token ||
        customConfig.polyfactToken ||
        defaultConfig.polyfactToken,
      endpoint:
        options.endpoint || customConfig.endpoint || defaultConfig.endpoint,
      modelName:
        options.model || customConfig.modelName || defaultConfig.modelName,
      maxTokensInResponse:
        options.maxTokens ||
        customConfig.maxTokensInResponse ||
        defaultConfig.maxTokensInResponse,
      systemMessageCommitPrompt:
        options.template ||
        customConfig.systemMessageCommitPrompt ||
        defaultConfig.systemMessageCommitPrompt,
      language:
        options.language || customConfig.language || defaultConfig.language,
      autocommit:
        options.autocommit !== undefined
          ? options.autocommit
          : customConfig.autocommit !== undefined
          ? customConfig.autocommit
          : defaultConfig.autocommit,
      openCommitTextEditor:
        options.editor !== undefined
          ? options.editor
          : customConfig.openCommitTextEditor !== undefined
          ? customConfig.openCommitTextEditor
          : defaultConfig.openCommitTextEditor,
      excludeFromDiff:
        options.exclude ||
        customConfig.excludeFromDiff ||
        defaultConfig.excludeFromDiff,
      diffFilter:
        options.filter || customConfig.diffFilter || defaultConfig.diffFilter,
    };

    autoCommit(config);
  });

program.parse(process.argv);
