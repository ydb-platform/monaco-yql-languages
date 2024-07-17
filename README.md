# @ydb-platform/monaco-yql-languages &middot; [![npm package](https://img.shields.io/npm/v/@ydb-platform/monaco-yql-languages)](https://www.npmjs.com/package/@ydb-platform/monaco-yql-languages) [![CI](https://img.shields.io/github/actions/workflow/status/ydb-platform/monaco-yql-languages/.github/workflows/ci.yml?label=CI&logo=github)](https://github.com/ydb-platform/monaco-yql-languages/actions/workflows/ci.yml?query=branch:main) [![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://github.com/ydb-platform/monaco-yql-languages/blob/main/LICENSE)

## Install

```
npm install --save monaco-editor monaco-editor-webpack-plugin @ydb-platform/monaco-yql-languages
```

## Usage

Add `customLanguages` section to monaco-editor-webpack-plugin options:

```json
{
  "customLanguages": [
    {"label": "yql", "entry": "@ydb-platform/monaco-yql-languages/build/monaco.contribution"}
  ]
}
```

This adds colorization for languages `yql (yql_ansi)`, `s-expression` and `clickhouse`
