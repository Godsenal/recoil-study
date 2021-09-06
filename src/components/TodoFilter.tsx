import { HStack, useRadioGroup } from "@chakra-ui/react";
import { useMemo } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { TodoFilterType, todoListFilterState } from "src/recoil/todo";
import RadioCard from "./RadioCard";

const TodoFilter = () => {
  const options = useMemo(() => Object.values(TodoFilterType), []);
  const [todoFilterType, setTodoFilterType] =
    useRecoilState(todoListFilterState);

  return (
    <HStack justifyContent="flex-end">
      {options.map((value) => {
        return (
          <RadioCard
            key={value}
            isChecked={todoFilterType === value}
            onChange={() => setTodoFilterType(value)}
          >
            {value}
          </RadioCard>
        );
      })}
    </HStack>
  );
};

export default TodoFilter;
