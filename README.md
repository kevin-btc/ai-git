# Git AI

Git AI is a tool that helps generate commit messages using AI. It simplifies the commit process by automatically generating a short, descriptive commit message based on your code changes.

## Features

- Analyzes staged git diffs and generates a commit message summarizing the changes
- Leverages Polyfact's AI API to generate natural language
- Handles large diffs by splitting into multiple API requests
- Customizable options like commit message language, model name, etc.
- Auto-commit mode to directly commit the generated message
- Optional git commit --amend to open editor and refine message

## Usage

### Prerequisites

- Node.js
- Git CLI
- [Polyfact Token](https://app.polyfact.com)

### Installation

```
npm install -g @polyfact/git-ai
```

or

```
yarn global add @polyfact/git-ai
```

### Configuration

Create a `.ai-gitrc` file to customize options.

```
ai-git init-config
```

Or set options as CLI flags:

```
ai-git commit --token YOUR_TOKEN --language english --model gpt-3.5-turbo
```

### Basic Usage

```
# Auto generate and commit
ai-git commit

# Generate message without auto commit
ai-git commit --no-autocommit

# Open editor to refine message after commit
ai-git commit --editor
```

## Configuration

The CLI and config file options allow customizing the commit message generation:

- `token` - Polyfact API key
- `model` - AI model name
- `maxTokens` - Max tokens per API request
- `language` - Commit message language
- `autocommit` - Directly create commit
- `editor` - Open editor after commit
- `exclude` - Patterns to exclude from diff
- `filter` - Git diff filter flag
- `template` - Prompt template for AI
