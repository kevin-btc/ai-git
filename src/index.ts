import { program } from "commander";
import { Config, autoCommit } from "./autocommit";
import { writeFileSync, existsSync } from "fs";

import defaultConfig from "./config.js";
import rc from "rc";

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

program
  .command("init-config")
  .description("Create a custom config file for ai-git")
  .action(createCustomConfigFile);

program
  .name("ai-git")
  .command("commit")
  .description("Automatically generate a commit message using AI")
  .option("-t, --token <type>", "Set POLYFACT_TOKEN")
  .option("-m, --model <type>", "Set Model Name")
  .option("--maxTokens <number>", "Set Max Tokens In Response")
  .option("--template <type>", "System Message Prompt Template")
  .option("-l, --language <type>", "Language for Commit Message")
  .option("--autocommit", "Enable auto commit")
  .option("--editor", "Open Commit Text Editor after commit")
  .option("--exclude <items>", "Exclude patterns from diff", (val) =>
    val.split(",")
  )
  .option("--filter <type>", "Diff Filter")
  .action((options) => {
    const config: Config = {
      polyfactToken:
        options.token ||
        customConfig.polyfactToken ||
        defaultConfig.polyfactToken,
      modelName:
        options.model || customConfig.modelName || defaultConfig.modelName,
      maxTokensInResponse:
        options.maxTokens ||
        customConfig.maxTokensInResponse ||
        defaultConfig.maxTokensInResponse,
      systemMessagePromptTemplate:
        options.template ||
        customConfig.systemMessagePromptTemplate ||
        defaultConfig.systemMessagePromptTemplate,
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
