import { Errors } from "~/core/constants";
import { Id } from "~/core/shared/Id";

test("shall create new valid id", () => {
  const id = Id.new;

  expect(id.isNew).toBe(true);
  expect(id.value).toHaveLength(36);
});

test("shall throw error when id is invalid", () => {
  expect(() => new Id("123")).toThrow(new Error(Errors.INVALID_ID));
});

test("shall create new id from existing id", () => {
  const oldId = Id.new;
  const id = new Id(oldId.value);

  expect(id.isNew).toBe(false);
  expect(id.value).toHaveLength(36);
});
