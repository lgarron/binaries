#!/usr/bin/env -S bun run --

import { mkdir, rm } from "node:fs/promises";
import { join } from "node:path";
import { $ } from "bun";
import { recordVersion } from "./lib/record-version";

const TEMP_DIR_BUN = "./.temp/bun";
const TGZ_PATH = join(TEMP_DIR_BUN, "bun.tgz");

const tarballURL = (
  await $`npm view @oven/bun-linux-x64 dist.tarball`.text()
).trim();
console.log(`Downloading: ${tarballURL}`);
await mkdir(TEMP_DIR_BUN, { recursive: true });
await $`curl --output ${TGZ_PATH} ${tarballURL}`;

await $`tar -xzvf ${TGZ_PATH} -C ${TEMP_DIR_BUN}`;
await $`mv ${join(TEMP_DIR_BUN, "package/bin/bun")} ./linux-x64/bun`;

await rm(TEMP_DIR_BUN, { force: true, recursive: true });

await recordVersion("bun", (await $`./linux-x64/bun --version`.text()).trim());
