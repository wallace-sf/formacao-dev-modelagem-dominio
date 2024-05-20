import { Person } from "~/core/person/Person";
import { Errors } from "~/core/constants";

test("should create new valid person", () => {
  const person = new Person({
    name: "Pedro Augusto Soares",
    cpf: "280.012.389-38",
  });

  expect(person.id.isNew).toBeTruthy();
});
