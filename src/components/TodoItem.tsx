import { EditIcon } from "@chakra-ui/icons";
import {
  ButtonGroup,
  HStack,
  IconButton,
  Input,
  Spacer,
  Text,
} from "@chakra-ui/react";
import produce from "immer";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { todoListState, TTodo } from "src/recoil/todo";

const TodoItem = ({ id, isCompleted, text }: TTodo) => {
  const setTodoListState = useSetRecoilState(todoListState);
  const [editText, setEditText] = useState(text);
  const [isEdit, setIsEdit] = useState(false);

  const handleEdit = () => {
    setTodoListState(
      produce((draft: TTodo[]) => {
        const index = draft.findIndex((t) => t.id === id);
        index !== -1 && (draft[index].text = editText);
      })
    );
    setIsEdit(false);
  };

  if (isEdit) {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleEdit();
        }}
      >
        <Input value={editText} onChange={(e) => setEditText(e.target.value)} />
      </form>
    );
  }

  return (
    <HStack>
      <Text>{text}</Text>
      <Spacer />
      <ButtonGroup>
        <IconButton
          aria-label="edit"
          icon={<EditIcon />}
          onClick={() => setIsEdit(true)}
        />
      </ButtonGroup>
    </HStack>
  );
};

export default TodoItem;
