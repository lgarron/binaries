#!/usr/bin/env bun

import { $, file } from "bun";
import { exit } from "node:process";

let exitCode = 0;

const versionsJSON: Record<string, string> =
  await file("./versions.json").json();
async function checkVersion(key: string, shellPromise: $.ShellPromise) {
  const versionString = (await shellPromise.text()).trim();
  console.log(`[${key}] ${versionString}`);

  const expected = versionsJSON[key];
  if (expected !== versionString) {
    console.log(`[${key}] ❌ Expected: ${expected}`);
    exitCode = 1;
  }
}

await checkVersion("bun", $`./linux-x64/bun --version`);
await checkVersion("fish", $`./linux-x64/fish --version`);
await checkVersion("mak", $`./linux-x64/mak --version`);
await checkVersion("repo", $`./linux-x64/repo --version`);
await checkVersion("toml2json", $`./linux-x64/toml2json --version`);
await checkVersion("cargo-bump", $`./linux-x64/cargo-bump --version`);

exit(exitCode);

// Can't check `git-freeze` against the scripts themselves.
// TODO: write the hash into the files?
