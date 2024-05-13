// The following tests expose the problems of the anemic class.
// Usually, we don't test interfaces.
import { isEmail } from "validator";

import User from "~/core/user/AnemicUserV4";
import { Errors } from "~/core/constants";

const createUser = () => new User(1, "João", "joaosilva@zmail.com", "123456");

test("shall allow user with undefined name: v4", () => {
  const user = createUser();

  user.name = undefined as any;

  expect(user.name).toBeUndefined();
});

test("shall allow unnamed user: v4", () => {
  const user = createUser();

  user.name = "";

  expect(user.name).toBe("");
});

test("shall allow user with negative id: v4", () => {
  const user = createUser();

  user.id = -1;

  expect(user.id).toBeLessThan(0);
});

test("shall throw error when user input invalid e-mail: v4", () => {
  const user = createUser();
  const newEmail = "@#";

  expect(() => {
    user.email = newEmail;
  }).toThrow(new Error(Errors.INVALID_EMAIL));
});

test("shall allow user with valid e-mail: v4", () => {
  const user = createUser();
  const newEmail = "email@email.com";

  user.email = newEmail;

  expect(user.email).toBe(newEmail);
});

test("shall throw error when user input password: v4", () => {
  const user = createUser();
  const newPassword = "65432";

  expect(() => {
    user.password = newPassword;
  }).toThrow(new Error(Errors.INVALID_PASSWORD));
});

test("shall change password when user input valid password: v4", () => {
  const newPassword = "563412";
  const user = createUser();

  user.password = newPassword;

  expect(user.password).toBe(newPassword);
});
