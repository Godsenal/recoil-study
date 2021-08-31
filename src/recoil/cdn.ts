import { selectorFamily } from "recoil";
import { searchCdn } from "src/api/cdn";

export type TCdn = {
  name: string;
  latest: string;
  filename: string;
  description: string;
  version: string;
  homepage: string;
  keywords: string[];
  github: {
    stargazers_count: number;
  };
  repository: {
    url: string;
  };
};

export const cdnQuery = selectorFamily({
  key: "cdnList",
  get: (query: string) => async () => {
    if (!query) {
      return [];
    }

    const response = await searchCdn(query);

    return response;
  },
});
