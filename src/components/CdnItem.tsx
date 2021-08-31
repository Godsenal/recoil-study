import { ExternalLinkIcon, StarIcon } from "@chakra-ui/icons";
import { Box, HStack, Link, Spacer, Stack, Tag, Text } from "@chakra-ui/react";
import { TCdn } from "src/recoil/cdn";

type TProps = {
  cdn: TCdn;
  onClickKeyword: (keyword: string) => void;
};

const CdnItem = ({ cdn, onClickKeyword }: TProps) => {
  return (
    <Stack borderRadius="md" bg="#454647" color="white" p={5}>
      <HStack>
        <Link href={cdn.homepage} fontSize="lg" color="orange.400">
          {cdn.name} @ {cdn.version}
        </Link>
        {typeof cdn.github.stargazers_count === "number" && (
          <>
            <StarIcon />
            <Text>
              {new Intl.NumberFormat("en-US", {
                notation: "compact",
              }).format(cdn.github.stargazers_count)}
            </Text>
          </>
        )}
        <Spacer />
        {cdn.repository?.url && (
          <Link href={cdn.repository.url}>
            <ExternalLinkIcon />
          </Link>
        )}
      </HStack>
      <Text>{cdn.description}</Text>
      {cdn.keywords && (
        <Box>
          {cdn.keywords.map((keyword) => (
            <Tag
              mr={2}
              mt={2}
              cursor="pointer"
              onClick={() => onClickKeyword(keyword)}
            >
              {keyword}
            </Tag>
          ))}
        </Box>
      )}
    </Stack>
  );
};

export default CdnItem;
