import { atom } from "recoil";

type TTodo = {
  id: string;
  text: string;
  isCompleted: boolean;
};

export const todoListState = atom<TTodo[]>({
  key: "todoListState",
  default: [],
});
