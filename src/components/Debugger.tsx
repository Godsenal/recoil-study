import { LinkIcon } from "@chakra-ui/icons";
import { Box, Code, Heading, Text, Stack } from "@chakra-ui/layout";
import { Button, Flex, IconButton, Spacer } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  Loadable,
  Snapshot,
  useGotoRecoilSnapshot,
  useRecoilSnapshot,
} from "recoil";

const Debugger = () => {
  const [snapshots, setSnapshots] = useState<
    { snapshot: Snapshot; changed: (Loadable<any> & { key: string })[] }[]
  >([]);
  const snapshot = useRecoilSnapshot();
  const goToSnapshot = useGotoRecoilSnapshot();

  snapshot.retain();

  const undo = () => {
    goToSnapshot(snapshots[snapshots.length - 2].snapshot);
  };

  useEffect(() => {
    const existIdx = snapshots.findIndex(
      (s) => s.snapshot.getID() === snapshot.getID()
    );

    if (existIdx >= 0) {
      setSnapshots(snapshots.slice(0, existIdx + 1));
    } else {
      const changed = [...snapshot.getNodes_UNSTABLE({ isModified: true })].map(
        (node) => ({ key: node.key, ...snapshot.getLoadable(node) })
      );

      setSnapshots((p) => [...p, { snapshot, changed }]);
    }
  }, [snapshot]);

  return (
    <Box
      position="fixed"
      top={5}
      right={5}
      w="400px"
      wordBreak="break-all"
      bg="white"
    >
      <Heading>Debugger</Heading>
      <Stack
        h="500px"
        overflowY="auto"
        mt={5}
        boxShadow="md"
        borderRadius="md"
        p={5}
      >
        <Box textAlign="right">
          {snapshots.length > 1 && <Button onClick={() => undo()}>Undo</Button>}
        </Box>
        {[...snapshots].reverse().map(({ snapshot, changed }, i) => (
          <Box key={i}>
            {changed.map(({ key, contents, state }, i) => {
              return (
                <Box key={key}>
                  <Flex>
                    <Text fontSize="lg" as="strong">
                      {key}
                    </Text>
                    <Spacer />
                    <IconButton
                      aria-label="go"
                      icon={<LinkIcon />}
                      onClick={() => goToSnapshot(snapshot)}
                    />
                  </Flex>
                  <Text>
                    <strong>state:</strong> {state}
                  </Text>
                  <Text as="strong">contents: </Text>
                  <Code w="full" as="pre" fontSize="xs" p={5} borderRadius="md">
                    {JSON.stringify(contents, null, 2)}
                  </Code>
                </Box>
              );
            })}
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default Debugger;
