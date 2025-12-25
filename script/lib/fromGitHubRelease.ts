#!/usr/bin/env -S bun run --

import assert from "node:assert";
import { exit } from "node:process";
import { Path } from "path-class";
import { PrintableShellCommand } from "printable-shell-command";
import { recordVersion } from "./record-version";

const TEMP_DIR_ROOT = new Path("./.temp/");
const DESTINATION_DIR = new Path("./linux-x64/");

type Releases = {
  assets: [
    {
      name: string;
      browser_download_url: string;
    },
  ];
}[];

export async function fromGitHubRelease(options: {
  binaryName: string;
  repoSlug: string;
  additionalBinaries?: string[];
}) {
  // TODO: validate better
  assert.equal(options.binaryName.split("/").length, 1);
  assert.equal(options.repoSlug.split("/").length, 2);

  const data: Releases = await (
    await fetch(
      new URL(`https://api.github.com/repos/${options.repoSlug}/releases`),
    )
  ).json();

  const TEMP_DIR = await TEMP_DIR_ROOT.join(options.binaryName).mkdir();
  const TAR_XZ_PATH = TEMP_DIR.join("archive.tar.xz");

  await (async () => {
    for (const asset of data[0].assets) {
      if (
        (asset.name.includes("linux") && asset.name.includes("x86_64")) ||
        asset.name.includes("amd64")
      ) {
        console.log(`Downloading: ${asset.browser_download_url}`);
        await TAR_XZ_PATH.write(fetch(asset.browser_download_url));
        return;
      }
    }
    exit(1);
  })();

  await new PrintableShellCommand("tar", [
    "xf",
    TAR_XZ_PATH,
    ["-C", TEMP_DIR],
  ]).shellOut();

  for (const fileName of [
    options.binaryName,
    ...(options.additionalBinaries ?? []),
  ]) {
    await TEMP_DIR.join(fileName).rename(DESTINATION_DIR.join(fileName));
  }

  await TEMP_DIR.rm_rf();

  const version = (
    await new PrintableShellCommand(DESTINATION_DIR.join(options.binaryName), [
      "--version",
    ]).text()
  ).trim();

  await recordVersion(options.binaryName, version);
}
