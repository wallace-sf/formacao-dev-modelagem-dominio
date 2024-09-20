import { Errors } from "../constants/Errors";

export interface ErrorValidationProps<TValue, TExtras extends object> {
  code?: string;
  value?: TValue;
  extras?: TExtras;
}

export class ErrorValidation<
  TValue,
  TExtras extends object = {}
> extends Error {
  readonly code: string;
  readonly value?: TValue;
  readonly extras?: TExtras;

  private constructor(props: ErrorValidationProps<TValue, TExtras>) {
    super(props.code ?? Errors.UNKOWN);
    this.code = this.message;
    this.value = props.value;
    this.extras = props.extras;
  }

  static new<TValue, TExtras extends object = {}>(
    code?: string,
    value?: TValue,
    extras?: TExtras
  ): ErrorValidation<TValue, TExtras> {
    return new ErrorValidation({ code, value, extras });
  }

  static throw<TValue, TExtras extends object = {}>(
    code?: string,
    value?: TValue,
    extras?: TExtras
  ): never {
    throw new ErrorValidation({ code, value, extras });
  }
}
