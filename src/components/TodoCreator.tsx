import { useSetRecoilState } from "recoil";
import { Box, Input } from "@chakra-ui/react";
import { useState } from "react";
import { nanoid } from "nanoid";
import { todoListState } from "src/recoil/todo";

const TodoCreator = () => {
  const [value, setValue] = useState("");
  const setTodoListState = useSetRecoilState(todoListState);

  const handleCreate = () => {
    if (!value) {
      return;
    }

    setTodoListState((v) => [
      ...v,
      { id: nanoid(), text: value, isCompleted: false },
    ]);
    setValue("");
  };

  return (
    <Box>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleCreate();
        }}
      >
        <Input
          placeholder="할일을 입력하세요."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </form>
    </Box>
  );
};

export default TodoCreator;
