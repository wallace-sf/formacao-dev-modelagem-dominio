import { Errors } from "../constants";

// Anemic Class for teaching purposes
export default class AnemicUserV3 {
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

  getId(): number {
    return this._id;
  }

  setId(id: number) {
    this._id = id;
  }

  getName(): string {
    return this._name;
  }

  setName(name: string) {
    this._name = name;
  }

  getEmail(): string {
    return this._email;
  }

  setEmail(email: string) {
    this._email = email;
  }

  getPassword() {
    return this._password;
  }

  setPassword(password: string) {
    if (password.length < 6) throw new Error(Errors.INVALID_PASSWORD);

    this._password = password;
  }
}
