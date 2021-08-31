import { TCdn } from "src/recoil/cdn";

const searchFields = [
  "filename",
  "description",
  "version",
  "keywords",
  "alternativeNames",
  "fileType",
  "github",
  "homepage",
  "repository",
];

export const searchCdn = async (query: string) => {
  const result = await fetch(
    `https://api.cdnjs.com/libraries?search=${query}&fields=${searchFields.join(
      ","
    )}&search_fields=keywords&limit=15`
  );
  const data = (await result.json()) as { results: TCdn[] };

  return data.results;
};
