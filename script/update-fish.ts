#!/usr/bin/env bun

import { fromGitHubRelease } from "./lib/fromGitHubRelease";

await fromGitHubRelease({
  binaryName: "fish",
  repoSlug: "fish-shell/fish-shell",
});
