import {
  Button,
  Center,
  HStack,
  Input,
  Spinner,
  Stack,
} from "@chakra-ui/react";
import debounce from "lodash.debounce";
import React, { useState } from "react";
import { useRecoilValueLoadable } from "recoil";
import { cdnQuery, TCdn } from "src/recoil/cdn";
import CdnItem from "./CdnItem";

const CdnSearch = () => {
  const [value, setValue] = useState("");
  const [query, setQuery] = useState("");
  const [updateQuery] = useState(() =>
    debounce((v: string) => {
      setQuery(v);
    }, 500)
  );

  const handleChange = (v: string) => {
    !v ? setQuery(v) : updateQuery(v);
    setValue(v);
  };

  const { state, contents } = useRecoilValueLoadable(cdnQuery(query));
  const cdns = contents as TCdn[];

  return (
    <Stack>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setQuery(value);
        }}
      >
        <HStack>
          <Input
            type="search"
            value={value}
            onChange={(e) => handleChange(e.target.value)}
          />
          <Button type="submit">검색</Button>
        </HStack>
      </form>
      {state === "hasValue" &&
        (cdns.length > 0 ? (
          cdns.map((cdn, i) => (
            <CdnItem key={i} cdn={cdn} onClickKeyword={handleChange} />
          ))
        ) : (
          <Center py={10}>
            {query ? "검색 결과가 없습니다." : "검색어를 입력해주세요"}
          </Center>
        ))}
      {state === "loading" && (
        <Center py={10}>
          <Spinner />
        </Center>
      )}
    </Stack>
  );
};

export default CdnSearch;
