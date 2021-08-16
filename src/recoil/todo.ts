import { atom } from "recoil";

export type TTodo = {
  id: string;
  text: string;
  isCompleted: boolean;
};

export const todoListState = atom<TTodo[]>({
  key: "todoListState",
  default: [],
});
