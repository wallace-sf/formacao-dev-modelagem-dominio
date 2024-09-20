// The following tests expose the problems of the anemic class.
// Usually, we don't test interfaces.
import { isEmail } from "validator";

import User from "~/core/user/AnemicUserV3";
import { Errors } from "~/core/constants";

const createUser = () => new User(1, "João", "joaosilva@zmail.com", "123456");

test("shall allow user with undefined name: v3", () => {
  const user = createUser();

  user.setName(undefined as any);

  expect(user.getName()).toBeUndefined();
});

test("shall allow unnamed user: v3", () => {
  const user = createUser();

  user.setName("");

  expect(user.getName()).toBe("");
});

test("shall allow user with negative id: v3", () => {
  const user = createUser();

  user.setId(-1);

  expect(user.getId()).toBeLessThan(0);
});

test("shall allow user with invalid e-mail: v3", () => {
  const user = createUser();

  user.setEmail("@#");

  expect(isEmail(user.getEmail())).toBe(false);
});

test("shall throw error when user with invalid password: v3", () => {
  const newPassword = "65432";
  const user = createUser();

  expect(() => {
    user.setPassword(newPassword);
  }).toThrow(new Error(Errors.INVALID_PASSWORD));
});

test("shall change password when user input valid password: v3", () => {
  const newPassword = "563412";
  const user = createUser();

  user.setPassword(newPassword);

  expect(user.getPassword()).toBe(newPassword);
});
