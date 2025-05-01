#!/usr/bin/env bun

import { $ } from "bun";
import { recordVersion } from "./lib/record-version";

const { sha } = await (await fetch("https://api.github.com/repos/lgarron/git-freeze/commits/HEAD")).json();

for (const fileName of ["git-abandon", "git-freeze", "git-thaw"]) {
  await $`curl "https://raw.githubusercontent.com/lgarron/git-freeze/${sha}/bin/${fileName}" --output ./linux-x64/${fileName}`;
  await $`chmod +x ./linux-x64/${fileName}`;
}

recordVersion("git-freeze", sha);
