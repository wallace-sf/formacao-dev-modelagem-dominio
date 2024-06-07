import { Errors } from "~/core/constants/Errors";

import { RegionCPF } from "./RegionCPF";

export class CPF {
  private readonly _value: string;

  constructor(value?: string) {
    this._value = value ?? "";
    this._value = this._value.replace(/\D/g, "");
    this._validate(this._value);
  }

  get value(): string {
    return this._value;
  }

  get region(): RegionCPF {
    const regionNumber = +this._value[8];

    console.log("regionNumber", regionNumber);

    return new RegionCPF(regionNumber);
  }

  get formatted(): string {
    return this._value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  }

  get verifierDigit(): string {
    return this._value
      .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$4")
      .replace(/(\d{1})/, "$1");
  }

  private _validate(value: string) {
    const isValid = CPF.isValid(value);

    if (!isValid) throw new Error(Errors.INVALID_CPF);
  }

  static isValid(value: string): boolean {
    if (value == null) return false;

    const cleanValue = value.replace(/\D/g, "").split("");

    if (cleanValue.length !== 11) return false;

    const vd1 = CPF._validateVD(cleanValue.slice(0, 9), cleanValue[9]);
    const vd2 = CPF._validateVD(cleanValue.slice(1, 10), cleanValue[10]);

    return vd1 && vd2;
  }

  private static _validateVD(digits: string[], vd: string) {
    const factors = [10, 9, 8, 7, 6, 5, 4, 3, 2];

    const sum = digits
      .map((digit, index) => +digit * factors[index])
      .reduce((a, b) => a + b, 0);

    const rest = sum % 11;
    const result = rest < 2 ? 0 : 11 - rest;

    return result === +vd;
  }
}
