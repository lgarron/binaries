import { file } from "bun";

export async function recordVersion(key: string, value: string) {
  const versionsJSONFile = file("./versions.json");
  const versionsJSON = await versionsJSONFile.json();
  versionsJSON[key] = value;
  versionsJSONFile.write(JSON.stringify(versionsJSON, null, "  "));
}
