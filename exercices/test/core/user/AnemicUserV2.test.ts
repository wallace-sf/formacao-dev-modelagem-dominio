// The following tests expose the problems of the anemic class.
// Usually, we don't test interfaces.
import { isEmail, isStrongPassword } from "validator";

import User from "~/core/user/AnemicUserV2";

const createUser = () => new User(1, "João", "joaosilva@zmail.com", "123456");

test("shall allow unnamed user: v2", () => {
  const user = createUser();

  user.name = "";

  expect(user.name).toBe("");
});

test("shall allow user with negative id: v2", () => {
  const user = createUser();

  user.id = -1;

  expect(user.id).toBeLessThan(0);
});

test("shall allow user with invalid e-mail: v2", () => {
  const user = createUser();

  user.email = "@#";

  expect(isEmail(user.email)).toBe(false);
});

test("shall allow user with invalid password: v2", () => {
  const user = createUser();

  user.password = "a";

  const password = user.password ?? "";

  expect(isStrongPassword(password)).toBe(false);
});
