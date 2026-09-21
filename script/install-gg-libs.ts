#!/usr/bin/env -S bun run --

import { $ } from "bun";

await $`sudo apt update`;
await $`sudo apt install -y libgtk-3-dev libwebkit2gtk-4.1-dev`;
