#!/usr/bin/env -S bun run --

import { fromGitHubRelease } from "./lib/fromGitHubRelease";

await fromGitHubRelease({
  binaryName: "jj",
  repoSlug: "jj-vcs/jj",
});
