import { Container, Heading, Stack } from "@chakra-ui/react";
import TodoCreator from "src/components/TodoCreator";
import TodoList from "src/components/TodoList";

function App() {
  return (
    <Container py={5}>
      <Stack w="full" spacing={4}>
        <Heading textAlign="center">TODO</Heading>
        <TodoCreator />
        <TodoList />
      </Stack>
    </Container>
  );
}

export default App;
