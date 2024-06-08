import { RegionCPF } from "../shared/RegionCPF";
import { Person } from "./Person";

export class PersonsByRegion {
  private readonly _persons: Person[];

  constructor(persons: Person[]) {
    this._persons = persons;
  }

  public group(): Map<number, Person[]> {
    return this._persons.reduce((acc, person) => {
      const { region } = person.cpf;
      const personsFromRegion = acc.get(region.value) || [];

      personsFromRegion.push(person);
      acc.set(region.value, personsFromRegion);

      return acc;
    }, new Map<number, Person[]>());
  }
}
