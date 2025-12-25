#!/usr/bin/env -S bun run --

import { fromGitHubRelease } from "./lib/fromGitHubRelease";

await fromGitHubRelease({
  binaryName: "fish",
  repoSlug: "fish-shell/fish-shell",
});
