import { atom, selector } from "recoil";

export type TTodo = {
  id: string;
  text: string;
  isCompleted: boolean;
};

export enum TodoFilterType {
  All = "All",
  Completed = "Completed",
  Uncompleted = "Uncompleted",
}

export const todoListState = atom<TTodo[]>({
  key: "todoListState",
  default: [],
});

export const todoListFilterState = atom<TodoFilterType>({
  key: "todoListFilterState",
  default: TodoFilterType.All,
});

export const filteredTodoListState = selector({
  key: "filteredTodoListState",
  get: ({ get }) => {
    const filter = get(todoListFilterState);
    const list = get(todoListState);

    switch (filter) {
      case TodoFilterType.Completed:
        return list.filter((item) => item.isCompleted);
      case TodoFilterType.Uncompleted:
        return list.filter((item) => !item.isCompleted);
      default:
        return list;
    }
  },
});
