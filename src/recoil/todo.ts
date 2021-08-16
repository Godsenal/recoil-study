import { atom, selector } from "recoil";

export type TTodo = {
  id: string;
  text: string;
  isCompleted: boolean;
};

export enum TodoFilter {
  All,
  Completed,
  Uncompleted,
}

export const todoListState = atom<TTodo[]>({
  key: "todoListState",
  default: [],
});

export const todoListFilterState = atom<TodoFilter>({
  key: "todoListFilterState",
  default: TodoFilter.All,
});

export const filteredTodoListState = selector({
  key: "filteredTodoListState",
  get: ({ get }) => {
    const filter = get(todoListFilterState);
    const list = get(todoListState);

    switch (filter) {
      case TodoFilter.Completed:
        return list.filter((item) => item.isCompleted);
      case TodoFilter.Uncompleted:
        return list.filter((item) => !item.isCompleted);
      default:
        return list;
    }
  },
});
