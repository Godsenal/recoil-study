import { HStack, useRadioGroup } from "@chakra-ui/react";
import { useMemo } from "react";
import { useSetRecoilState } from "recoil";
import { TodoFilterType, todoListFilterState } from "src/recoil/todo";
import RadioCard from "./RadioCard";

const TodoFilter = () => {
  const options = useMemo(() => Object.values(TodoFilterType), []);
  const setTodoFilter = useSetRecoilState(todoListFilterState);

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "todoFilter",
    defaultValue: TodoFilterType.All,
    onChange: (type) => setTodoFilter(type as TodoFilterType),
  });

  const group = getRootProps();

  return (
    <HStack {...group} justifyContent="flex-end">
      {options.map((value) => {
        const radio = getRadioProps({ value });
        return (
          <RadioCard key={value} {...radio}>
            {value}
          </RadioCard>
        );
      })}
    </HStack>
  );
};

export default TodoFilter;
