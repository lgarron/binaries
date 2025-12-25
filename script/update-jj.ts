#!/usr/bin/env bun

import { mkdir, rm } from "node:fs/promises";
import { join } from "node:path";
import { exit } from "node:process";
import { $ } from "bun";
import { PrintableShellCommand } from "printable-shell-command";
import { recordVersion } from "./lib/record-version";

const TEMP_DIR_JJ = "./.temp/jj";
const TAR_XZ_PATH = join(TEMP_DIR_JJ, "jj.tar.xz");

type Releases = {
  assets: [
    {
      name: string;
      browser_download_url: string;
    },
  ];
}[];

const data: Releases = await (
  await fetch("https://api.github.com/repos/jj-vcs/jj/releases")
).json();

await mkdir(TEMP_DIR_JJ, { recursive: true });

await (async () => {
  for (const asset of data[0].assets) {
    if (asset.name.includes("linux") && (asset.name.includes("x86_64") || asset.name.includes("amd64"))) {
      console.log(`Downloading: ${asset.browser_download_url}`);
      await new PrintableShellCommand("curl", [
        "--location",
        ["--output", TAR_XZ_PATH],
        asset.browser_download_url,
      ]).shellOutNode();
      return;
    }
  }
  exit(1);
})();

await new PrintableShellCommand("tar", [
  "xf",
  TAR_XZ_PATH,
  ["-C", TEMP_DIR_JJ],
]).shellOutNode();

console.log({TEMP_DIR_FISH: TEMP_DIR_JJ})
for (const fileName of ["jj"]) {
  await $`mv ${join(TEMP_DIR_JJ, fileName)} ${join("./linux-x64/", "jj")}`;
}

await rm(TEMP_DIR_JJ, { force: true, recursive: true });

await recordVersion(
  "jj",
  (await $`./linux-x64/jj --version`.text()).trim(),
);
