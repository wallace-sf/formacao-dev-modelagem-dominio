import { isEmail } from "validator";

import { Validation } from "../types";

export class Validator {
  private _validations: Array<Validation>;

  constructor() {
    this._validations = [];
  }

  public add(validation: Validation) {
    this._validations.push(validation);

    return this;
  }

  public validate() {
    let error: string | null = null;

    for (const validation of this._validations) {
      error = validation();

      if (error != null) break;
    }

    return error;
  }

  static isEmail(email: string, error: string) {
    return () => {
      const isValid = isEmail(email);

      return isValid ? null : error;
    };
  }

  static isPassword(password: string, error: string) {
    return () => {
      const isValid = password.length >= 6;

      return isValid ? null : error;
    };
  }
}
