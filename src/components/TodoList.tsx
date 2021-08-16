import { Center } from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { todoListState } from "src/recoil/todo";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const [todoList] = useRecoilState(todoListState);

  if (todoList.length === 0) {
    return <Center>등록된 Todo가 없습니다.</Center>;
  }

  return (
    <>
      {todoList.map((todo) => (
        <TodoItem key={todo.id} {...todo} />
      ))}
    </>
  );
};

export default TodoList;
