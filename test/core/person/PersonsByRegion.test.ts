import { PersonsByRegion } from "~/core/person/PersonsByRegion";
import { RegionCPF } from "~/core/shared/RegionCPF";
import { PersonBuilder } from "~/test/data/PersonBuilder";

test("should group persons by region from SP", () => {
  const persons = PersonBuilder.list(100);
  const grouped = new PersonsByRegion(persons).group();

  const region9 = new RegionCPF(9);

  const personsFromRegion9 = grouped.get(region9.value) ?? [];
  const sameRegion = personsFromRegion9.every((person) =>
    region9.equals(person.cpf.region)
  );

  expect(sameRegion).toBeTruthy();

  const region7 = new RegionCPF(7);

  const personsFromRegion7 = grouped.get(region7.value) ?? [];
  const sameRegion2 = personsFromRegion7.every((person) =>
    region9.diff(person.cpf.region)
  );

  expect(sameRegion2).toBeTruthy();
});
