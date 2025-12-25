#!/usr/bin/env bun

import { fromGitHubRelease } from "./lib/fromGitHubRelease";

await fromGitHubRelease({
  binaryName: "jj",
  repoSlug: "jj-vcs/jj",
});
