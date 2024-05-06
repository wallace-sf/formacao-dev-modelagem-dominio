// The following tests expose the problems of the anemic class.
// Usually, we don't test interfaces.
import { isEmail, isStrongPassword } from "validator";

import User from "~/core/user/AnemicUserV1";

const createUser = (): User => ({
  id: 1,
  name: "João",
  email: "joaosilva@zmail.com",
  password: "123456",
});

test("shall allow unnamed user", () => {
  const user = createUser();

  user.name = "";

  expect(user.name).toBe("");
});

test("shall allow user with negative id", () => {
  const user = createUser();

  user.id = -1;

  expect(user.id).toBeLessThan(0);
});

test("shall allow user with invalid e-mail", () => {
  const user = createUser();

  user.email = "@#";

  expect(isEmail(user.email)).toBe(false);
});

test("shall allow user with invalid password", () => {
  const user = createUser();

  user.password = "a";

  const password = user.password ?? "";

  expect(isStrongPassword(password)).toBe(false);
});
