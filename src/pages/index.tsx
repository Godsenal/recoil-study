import { Container, Heading, Stack } from "@chakra-ui/react";
import CdnSearch from "src/components/CdnSearch";
import TodoCreator from "src/components/TodoCreator";
import TodoList from "src/components/TodoList";
import TodoFilter from "../components/TodoFilter";

function Home() {
  return (
    <Container py={5}>
      <Stack spacing={10}>
        <Stack w="full" spacing={4}>
          <Heading textAlign="center">CDNJS</Heading>
          <CdnSearch />
        </Stack>
        <Stack w="full" spacing={4}>
          <Heading textAlign="center">TODO</Heading>
          <TodoCreator />
          <TodoFilter />
          <TodoList />
        </Stack>
      </Stack>
    </Container>
  );
}

export default Home;
