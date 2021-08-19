import { Snapshot, snapshot_UNSTABLE } from "recoil";
import {
  filteredTodoListState,
  TodoFilterType,
  todoListFilterState,
  todoListState,
} from "../recoil/todo";

describe("todo 테스트", () => {
  const todos = [
    { id: "1", text: "todo", isCompleted: false },
    { id: "2", text: "todo2", isCompleted: false },
    { id: "3", text: "todo3", isCompleted: true },
  ];
  let snapshot: Snapshot;

  beforeEach(() => {
    snapshot = snapshot_UNSTABLE(({ set }) => set(todoListState, todos));
  });

  it("todo 생성/삭제 테스트", () => {
    expect(snapshot.getLoadable(todoListState).valueOrThrow()).toStrictEqual(
      todos
    );

    // when
    const newTodo = { id: "4", text: "new", isCompleted: false };
    snapshot = snapshot.map(({ set }) =>
      set(todoListState, (v) => [...v, newTodo])
    );

    // then
    expect(snapshot.getLoadable(todoListState).valueOrThrow()).toStrictEqual([
      ...todos,
      newTodo,
    ]);

    // when
    snapshot = snapshot.map(({ set }) =>
      set(todoListState, (v) => v.filter((todo) => todo.id !== newTodo.id))
    );

    // then
    expect(snapshot.getLoadable(todoListState).valueOrThrow()).toStrictEqual(
      todos
    );
  });

  it("todo 필터 테스트", () => {
    // when
    snapshot = snapshot.map(({ set }) =>
      set(todoListFilterState, TodoFilterType.Completed)
    );

    // then
    expect(
      snapshot.getLoadable(filteredTodoListState).valueOrThrow()
    ).toStrictEqual(todos.filter((todo) => todo.isCompleted));

    // when
    snapshot = snapshot.map(({ set }) =>
      set(todoListFilterState, TodoFilterType.Uncompleted)
    );

    // then
    expect(
      snapshot.getLoadable(filteredTodoListState).valueOrThrow()
    ).toStrictEqual(todos.filter((todo) => !todo.isCompleted));
  });
});
