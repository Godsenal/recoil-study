import { atom } from "recoil";

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
