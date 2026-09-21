#!/usr/bin/env -S bun run --

import { $ } from "bun";
import { recordVersion } from "./lib/record-version";

await $`sudo apt update`;
await $`sudo apt install -y libgtk-3-dev libwebkit2gtk-4.1-dev`;

await $`cargo install --locked --root ./.temp/gg/ gg-cli`;
await $`cp ./.temp/gg/bin/gg ./linux-x64/gg`;

await recordVersion("gg", (await $`gg --version`.text()).trim());
