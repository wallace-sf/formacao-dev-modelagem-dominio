import { v4 as uuid } from "uuid";

import { Errors } from "../constants";

import { Validator } from "../utils";

interface IdProps {
  value: string;
  isNew: boolean;
}

export class Id implements IdProps {
  private readonly _value: string;
  private readonly _isNew: boolean;

  constructor(value?: string) {
    this._value = value ?? uuid();
    this._isNew = value == null;
    this._validate(this._value);
    this.diff = this.diff.bind(this);
  }

  static get new() {
    return new Id();
  }

  get value(): string {
    return this._value;
  }

  get isNew(): boolean {
    return this._isNew;
  }

  private _validate(value: string) {
    const validator = new Validator().add(
      Validator.isUUID(value, Errors.INVALID_ID)
    );

    const error = validator.validate();

    if (error != null) throw new Error(error);
  }

  public equals(id: Id): boolean {
    return this._value === id.value;
  }

  public diff(id: Id): boolean {
    return !this.equals(id);
  }
}
