#!/usr/bin/env bun

import { $ } from "bun";
import { recordVersion } from "./lib/record-version";

await $`cargo install --force --target-dir ./.temp/mak/ mak`;
await $`cp ./.temp/mak/release/mak ./linux-x64/mak`

// TODO: why does this output `fake` rather than `mak` on Linux?
await recordVersion("mak", (await $`./linux-x64/mak --version`.text()).trim());

