import { Box, Center } from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { todoListState } from "src/recoil/todo";

const TodoList = () => {
  const [todoList] = useRecoilState(todoListState);

  if (todoList.length === 0) {
    return <Center>등록된 Todo가 없습니다.</Center>;
  }

  return (
    <>
      {todoList.map((todo) => (
        <Box key={todo.id}>{todo.text}</Box>
      ))}
    </>
  );
};

export default TodoList;
