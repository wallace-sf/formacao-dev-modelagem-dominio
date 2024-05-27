import { CPF } from "../shared/CPF";
import { PersonName } from "../shared/PersonName";
import { Entity, EntityProps } from "../shared/Entity";

interface PersonProps extends EntityProps {
  name?: string;
  cpf?: string;
}

export class Person extends Entity<Person, PersonProps> {
  readonly name: PersonName;
  readonly cpf: CPF;

  constructor(props: PersonProps) {
    super(props);
    this.name = new PersonName(props.name);
    this.cpf = new CPF(props.cpf);
  }
}
