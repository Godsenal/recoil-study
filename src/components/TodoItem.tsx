import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  ButtonGroup,
  Checkbox,
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

  const findAndUpdate = (cb: (draft: TTodo[], index: number) => void) => {
    return produce((draft: TTodo[]) => {
      const index = draft.findIndex((t) => t.id === id);
      index !== -1 && cb(draft, index);
    });
  };

  const handleEdit = () => {
    setTodoListState(
      findAndUpdate((draft, index) => (draft[index].text = editText))
    );
    setIsEdit(false);
  };

  const handleDelete = () => {
    setTodoListState(findAndUpdate((draft, index) => draft.splice(index, 1)));
  };

  const handleComplete = (nextCompleted: boolean) => {
    setTodoListState(
      findAndUpdate(
        (draft, index) => (draft[index].isCompleted = nextCompleted)
      )
    );
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
      <Checkbox
        defaultChecked={isCompleted}
        onChange={(e) => handleComplete(e.target.checked)}
      />
      <Text
        {...(isCompleted && {
          textDecoration: "line-through",
          color: "gray.400",
        })}
      >
        {text}
      </Text>
      <Spacer />
      <ButtonGroup>
        <IconButton
          aria-label="edit"
          icon={<EditIcon />}
          onClick={() => setIsEdit(true)}
        />
        <IconButton
          aria-label="delete"
          icon={<DeleteIcon />}
          onClick={handleDelete}
        />
      </ButtonGroup>
    </HStack>
  );
};

export default TodoItem;
