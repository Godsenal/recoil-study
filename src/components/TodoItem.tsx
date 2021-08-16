import { Box } from "@chakra-ui/react";
import { TTodo } from "src/recoil/todo";

const TodoItem = ({ id, isCompleted, text }: TTodo) => {
  return <Box>{text}</Box>;
};

export default TodoItem;
