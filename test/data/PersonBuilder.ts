import { Person, PersonProps } from "~/core/person/Person";
import { faker } from "@faker-js/faker/locale/pt_BR";
import { generate as cpf } from "gerador-validador-cpf";

export class PersonBuilder {
  private _props: PersonProps;

  constructor(props: PersonProps) {
    this._props = props;
  }

  static build(): PersonBuilder {
    return new PersonBuilder({ name: faker.person.fullName(), cpf: cpf() });
  }

  static list(count: number): Person[] {
    return Array.from({ length: count }, () => PersonBuilder.build().now());
  }

  public now(): Person {
    return new Person(this._props);
  }

  public withoutId(): PersonBuilder {
    this._props.id = undefined;

    return this;
  }

  public withName(name: string): PersonBuilder {
    this._props.name = name;

    return this;
  }

  public withoutName(): PersonBuilder {
    this._props.name = undefined;

    return this;
  }

  public withoutCPF(): PersonBuilder {
    this._props.cpf = undefined;

    return this;
  }
}
