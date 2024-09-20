import { Errors } from "~/core/constants/Errors";
import { Validator } from "../utils/Validator";

export class PersonName {
  private readonly _value: string;

  constructor(value?: string) {
    this._value = value ?? "";
    this._value = this._value.trim();
    this._validate(this._value);
  }

  private _validate(value: string) {
    const validator = new Validator()
      .add(Validator.isNotEmpty(value, Errors.EMPTY_NAME))
      .add(Validator.lengthGreaterThan(value, 4, Errors.NAME_TOO_SMALL))
      .add(Validator.lengthLessThan(value, 121, Errors.NAME_TOO_LARGE))
      .add(Validator.isNotEmpty(value.split(" ")[1], Errors.LASTNAME_REQUIRED))
      .add(
        Validator.regex(
          value,
          /^[a-zA-ZÀ-ú'-\.\s]+$/,
          Errors.INVALID_CHARACTERS_NAME
        )
      );

    const error = validator.validate();

    if (error != null) throw new Error(error);
  }

  get fullName(): string {
    return this._value;
  }

  get firstName(): string {
    return this._value.split(" ")[0];
  }

  get lastName(): string {
    return this._value.split(" ").pop() as string;
  }

  get surnames(): string[] {
    return this._value.split(" ").slice(1);
  }
}
