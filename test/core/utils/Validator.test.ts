import { Validator } from "~/core/utils/Validator";
import { Errors } from "~/core/constants";

test("should return null when email is valid", () => {
  const email = "xefibev690@fincainc.com";

  const error = Validator.isEmail(email, Errors.INVALID_EMAIL)();

  expect(error).toBeNull();
});

test("should return error when email is invalid", () => {
  const email = "@@.com";

  const error = Validator.isEmail(email, Errors.INVALID_EMAIL)();

  expect(error).toEqual(Errors.INVALID_EMAIL);
});

test("should return null when password is valid", () => {
  const password = "oEEZjtXVHAvEsEb";

  const error = Validator.isPassword(password, Errors.INVALID_PASSWORD)();

  expect(error).toBeNull();
});

test("should return error when password is invalid", () => {
  const password = "123";

  const error = Validator.isPassword(password, Errors.INVALID_PASSWORD)();

  expect(error).toEqual(Errors.INVALID_PASSWORD);
});

test("should return null when id is valid", () => {
  const id = "4e23fd2a-dbd0-45ee-b90a-251c76a9375d";

  const error = Validator.isUUID(id, Errors.INVALID_ID)();

  expect(error).toBeNull();
});

test("should return error when id is invalid", () => {
  const id = "1";

  const error = Validator.isUUID(id, Errors.INVALID_ID)();

  expect(error).toEqual(Errors.INVALID_ID);
});

test("should return null when regex is matched", () => {
  const regex = /\d/g;

  const error = Validator.regex("123", regex, Errors.INVALID_REGEX)();

  expect(error).toBeNull();
});

test("should return error when regex is not matched", () => {
  const regex = /\d/g;

  const error = Validator.regex("abc", regex, Errors.INVALID_REGEX)();

  expect(error).toEqual(Errors.INVALID_REGEX);
});

test("should return null when value is not empty", () => {
  const value = "test";

  const error = Validator.isNotEmpty(value, Errors.EMPTY_VALUE)();

  expect(error).toBeNull();
});

test("should return error when value is empty", () => {
  const value = "";

  const error = Validator.isNotEmpty(value, Errors.EMPTY_VALUE)();

  expect(error).toEqual(Errors.EMPTY_VALUE);
});

test("should return error when value is null", () => {
  const value = null;

  const error = Validator.isNotEmpty(value, Errors.EMPTY_VALUE)();

  expect(error).toEqual(Errors.EMPTY_VALUE);
});

test("should return error when value is undefined", () => {
  const value = undefined;

  const error = Validator.isNotEmpty(value, Errors.EMPTY_VALUE)();

  expect(error).toEqual(Errors.EMPTY_VALUE);
});

test("should return null when value is not null", () => {
  const value = "test";

  const error = Validator.isNotNull(value, Errors.INVALID_NOT_NULL)();

  expect(error).toBeNull();
});

test("should return error when value is null", () => {
  const value = null;

  const error = Validator.isNotNull(value, Errors.INVALID_NOT_NULL)();

  expect(error).toEqual(Errors.INVALID_NOT_NULL);
});

test("should return null when length is greater than", () => {
  const value = "test";

  const error = Validator.lengthGreaterThan(
    value,
    3,
    Errors.INVALID_GREATER_THAN
  )();

  expect(error).toBeNull();
});

test("should return error when length is not greater than", () => {
  const value = "te";

  const error = Validator.lengthGreaterThan(
    value,
    3,
    Errors.INVALID_GREATER_THAN
  )();

  expect(error).toEqual(Errors.INVALID_GREATER_THAN);
});

test("should return null when length is less than", () => {
  const value = "te";

  const error = Validator.lengthLessThan(value, 3, Errors.INVALID_LESS_THAN)();

  expect(error).toBeNull();
});

test("should return error when length is not less than", () => {
  const value = "test";

  const error = Validator.lengthLessThan(value, 3, Errors.INVALID_LESS_THAN)();

  expect(error).toEqual(Errors.INVALID_LESS_THAN);
});
