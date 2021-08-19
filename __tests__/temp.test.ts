import { atom, selector, snapshot_UNSTABLE } from "recoil";

const numberState = atom({ key: "Number", default: 0 });

const multipliedState = selector({
  key: "MultipliedNumber",
  get: ({ get }) => get(numberState) * 100,
});

test("Test multipliedState", () => {
  const initialSnapshot = snapshot_UNSTABLE();
  expect(initialSnapshot.getLoadable(multipliedState).valueOrThrow()).toBe(0);

  const testSnapshot = snapshot_UNSTABLE(({ set }) => set(numberState, 1));
  expect(testSnapshot.getLoadable(multipliedState).valueOrThrow()).toBe(100);
});
