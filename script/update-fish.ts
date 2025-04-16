#!/usr/bin/env bun

import { mkdir, rm } from "node:fs/promises";
import { join } from "node:path";
import { exit } from "node:process";
import { $ } from "bun";

const TEMP_DIR_FISH = "./.temp/fish";
const TAR_XZ_PATH = join(TEMP_DIR_FISH, "fish.tar.xz");

type Releases = {
  assets: [
    {
      name: string;
      browser_download_url: string;
    },
  ];
}[];

const data: Releases = await (
  await fetch("https://api.github.com/repos/fish-shell/fish-shell/releases")
).json();

await mkdir(TEMP_DIR_FISH, { recursive: true });

await (async () => {
  for (const asset of data[0].assets) {
    if (asset.name.includes("x86_64")) {
      console.log(`Downloading: ${asset.browser_download_url}`);
      await $`curl --location --output ${TAR_XZ_PATH} ${asset.browser_download_url}`;
      return;
    }
  }
  exit(1);
})();

await $`tar -xzvf ${TAR_XZ_PATH} -C ${TEMP_DIR_FISH}`;

for (const fileName of ["fish", "fish_indent", "fish_key_reader"]) {
  await $`mv ${join(TEMP_DIR_FISH, fileName)} ${join("./linux-x64/", fileName)}`;
}

await rm(TEMP_DIR_FISH, { force: true, recursive: true });
