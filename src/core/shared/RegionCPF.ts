import { CPF } from "./CPF";
import { Errors } from "~/core/constants/Errors";

export class RegionCPF {
  private readonly _value: number;
  static readonly RS = ["RS"];
  static readonly DF_GO_MS_MT_TO = ["DF", "GO", "MS", "MT", "TO"];
  static readonly AC_AM_AP_PA_RO_RR = ["AC", "AM", "AP", "PA", "RO", "RR"];
  static readonly CE_MA_PI = ["CE", "MA", "PI"];
  static readonly AL_PB_PE_RN = ["AL", "PB", "PE", "RN"];
  static readonly BA_SE = ["BA", "SE"];
  static readonly MG = ["MG"];
  static readonly ES_RJ = ["ES", "RJ"];
  static readonly SP = ["SP"];
  static readonly PR_SC = ["PR", "SC"];
  static readonly all = [
    RegionCPF.RS,
    RegionCPF.DF_GO_MS_MT_TO,
    RegionCPF.AC_AM_AP_PA_RO_RR,
    RegionCPF.CE_MA_PI,
    RegionCPF.AL_PB_PE_RN,
    RegionCPF.BA_SE,
    RegionCPF.MG,
    RegionCPF.ES_RJ,
    RegionCPF.SP,
    RegionCPF.PR_SC,
  ];

  constructor(value: number) {
    this._value = value;
    this._validate(this._value);
  }

  get value(): number {
    return this._value;
  }

  get taxRegions(): string[] {
    return RegionCPF.all[this._value];
  }

  static isValid(value: number) {
    return Number.isInteger(value) && value >= 0 && value <= 9;
  }

  private _validate(value: number) {
    const isValid = RegionCPF.isValid(value);

    if (!isValid) throw new Error(Errors.INVALID_REGION_CODE);
  }

  public equals(region: RegionCPF): boolean {
    return this._value === region.value;
  }

  public diff(region: RegionCPF): boolean {
    return !this.equals(region);
  }
}
