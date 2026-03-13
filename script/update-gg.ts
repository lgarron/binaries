#!/usr/bin/env -S bun run --

import { fromGitHubRelease } from "./lib/fromGitHubRelease";

await fromGitHubRelease({
  binaryName: "gg",
  repoSlug: "gulbanana/gg",
  rpmBinPath: "usr/bin/gg",
});
