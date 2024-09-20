import { ErrorValidation } from "~/error/ErrorValidation";
import { Errors } from "~/constants/Errors";

test("shall throw an error", () => {
  expect(() => ErrorValidation.throw(Errors.UNKOWN, "Value")).toThrow(
    Errors.UNKOWN
  );
});

test("shall create an valid error", () => {
  const error = ErrorValidation.new(Errors.UNKOWN);

  expect(error.code).toBe(Errors.UNKOWN);
});

test("shall create an valid error with value and extras", () => {
  const error = ErrorValidation.new(Errors.TOO_SHORT_NAME, "A", { min: 3 });

  expect(error.code).toBe(Errors.TOO_SHORT_NAME);
  expect(error.value).toBe("A");
  expect(error.extras?.min).toEqual(3);
});

test("shall create an valid without code", () => {
  const error = ErrorValidation.new();

  expect(error.code).toBe(Errors.UNKOWN);
});
