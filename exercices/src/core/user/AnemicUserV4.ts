import { Errors } from "../constants";

import { Validator } from "../utils";

// Anemic Class for teaching purposes
export default class AnemicUserV4 {
  private _id: number;
  private _name: string;
  private _email: string;
  private _password?: string;

  constructor(id: number, name: string, email: string, password?: string) {
    this._id = id;
    this._name = name;
    this._email = email;
    this._password = password;
  }

  get id(): number {
    return this._id;
  }

  set id(id: number) {
    this._id = id;
  }

  get name(): string {
    return this._name;
  }

  set name(name: string) {
    this._name = name;
  }

  get email(): string {
    return this._email;
  }

  set email(email: string) {
    const validator = new Validator().add(
      Validator.isEmail(email, Errors.INVALID_EMAIL)
    );

    if (validator.validate()) {
      throw new Error(Errors.INVALID_EMAIL);
    }

    this._email = email;
  }

  get password() {
    return this._password;
  }

  set password(password: string | undefined) {
    const validator = new Validator().add(
      Validator.isPassword(password as string, Errors.INVALID_PASSWORD)
    );

    if (validator.validate()) {
      throw new Error(Errors.INVALID_PASSWORD);
    }

    this._password = password;
  }
}
