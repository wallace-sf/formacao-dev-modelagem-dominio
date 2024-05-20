import { Id } from "../shared/Id";
import { CPF } from "../shared/CPF";
import { PersonName } from "../shared/PersonName";

interface PersonProps {
  id?: string;
  name?: string;
  cpf?: string;
}

export class Person {
  readonly rawProps: PersonProps;
  readonly id: Id;
  readonly name: PersonName;
  readonly cpf: CPF;

  constructor(props: PersonProps) {
    this.id = new Id(props.id);
    this.name = new PersonName(props.name);
    this.cpf = new CPF(props.cpf);
    this.rawProps = props;
  }
}
