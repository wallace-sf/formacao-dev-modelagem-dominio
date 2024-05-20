import { Errors } from "~/core/constants";
import { PersonName } from "~/core/shared/PersonName";

test("shall throw error when name is empty", () => {
  expect(() => new PersonName("")).toThrow(new Error(Errors.EMPTY_NAME));
  expect(() => new PersonName()).toThrow(new Error(Errors.EMPTY_NAME));
});

test("shall throw error when name is too small", () => {
  expect(() => new PersonName("a")).toThrow(new Error(Errors.NAME_TOO_SMALL));
});

test("shall throw error when name is too large", () => {
  expect(() => new PersonName("a".repeat(256))).toThrow(
    new Error(Errors.NAME_TOO_LARGE)
  );
});

test("shall throw error when name contains invalid characters", () => {
  expect(() => new PersonName("João a@b$#")).toThrow(
    new Error(Errors.INVALID_CHARACTERS_NAME)
  );
});

test("shall throw error when name has no last name", () => {
  expect(() => new PersonName("Guilherme")).toThrow(
    new Error(Errors.LASTNAME_REQUIRED)
  );
});

test("shall create name and two surnames", () => {
  const name = new PersonName("João Silva Pereira");

  expect(name.fullName).toBe("João Silva Pereira");
  expect(name.firstName).toBe("João");
  expect(name.surnames).toEqual(["Silva", "Pereira"]);
  expect(name.lastName).toBe("Pereira");
});
