import { isEmail, isUUID } from "validator";

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

  static isNotNull(value: unknown, error: string) {
    return () => {
      const isValid = value != null;

      return isValid ? null : error;
    };
  }

  static isNotEmpty(value: string | undefined | null, error: string) {
    return () => {
      if (Validator.isNotNull(value, error)() != null) return error;

      const cleanValue = value!.trim();
      const isValid = cleanValue !== "";

      return isValid ? null : error;
    };
  }

  static lengthGreaterThan(
    value: string | unknown[],
    length: number,
    error: string
  ) {
    return () => {
      const isValid = value.length > length;

      return isValid ? null : error;
    };
  }

  static lengthLessThan(
    value: string | unknown[],
    length: number,
    error: string
  ) {
    return () => {
      const isValid = value.length < length;

      return isValid ? null : error;
    };
  }

  static regex(value: string, regex: RegExp, error: string) {
    return () => {
      const isValid = regex.test(value);

      return isValid ? null : error;
    };
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

  static isUUID(value: string, error: string) {
    return () => {
      const isValid = isUUID(value);

      return isValid ? null : error;
    };
  }
}
