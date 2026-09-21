#!/usr/bin/env -S bun run --

import { $ } from "bun";
import { recordVersion } from "./lib/record-version";

await import("./install-gg-libs");

await $`cargo install --locked --root ./.temp/gg/ gg-cli`;
await $`cp ./.temp/gg/bin/gg ./linux-x64/gg`;

await recordVersion("gg", (await $`gg --version`.text()).trim());
