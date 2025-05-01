#!/usr/bin/env bun

import { $ } from "bun";
import { recordVersion } from "./lib/record-version";

await $`cargo install --force --target-dir ./.temp/repo/ repo toml2json cargo-bump`;
await $`cp ./.temp/repo/release/repo ./linux-x64/repo`
await $`cp ./.temp/repo/release/toml2json ./linux-x64/toml2json`
await $`cp ./.temp/repo/release/cargo-bump ./linux-x64/cargo-bump`

await recordVersion("repo", (await $`./linux-x64/repo --version`.text()).trim());
await recordVersion("toml2json", (await $`./linux-x64/toml2json --version`.text()).trim());
await recordVersion("cargo-bump", (await $`./linux-x64/cargo-bump --version`.text()).trim());

