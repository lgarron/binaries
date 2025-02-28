#!/usr/bin/env bun

import { $ } from "bun";

for (const fileName of ["git-abandon", "git-freeze", "git-thaw"]) {
  await $`curl "https://raw.githubusercontent.com/lgarron/git-freeze/main/bin/${fileName}" --output ./linux-x64/${fileName}`;
  await $`chmod +x ./linux-x64/${fileName}`;
}
