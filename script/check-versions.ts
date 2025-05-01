#!/usr/bin/env bun

import { default as assert } from "node:assert";
import { $, file } from "bun";

const versionsJSON: Record<string, string> =
  await file("./versions.json").json();

assert.equal(
  // biome-ignore lint/complexity/useLiteralKeys: string key.
  versionsJSON["bun"],
  (await $`./linux-x64/bun --version`.text()).trim(),
);

assert.equal(
  // biome-ignore lint/complexity/useLiteralKeys: string key.
  versionsJSON["fish"],
  (await $`./linux-x64/fish --version`.text()).trim(),
);

// Can't check `git-freeze` against the scripts themselves.
// TODO: write the hash into the files?
