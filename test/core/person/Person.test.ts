import { Id } from "~/core/shared/Id";
import { PersonBuilder } from "../../data/PersonBuilder";
import { Errors } from "~/core/constants";

test("should create new valid person", () => {
  const name = "Pedro Augusto Soares";
  const person = PersonBuilder.build().withoutId().withName(name).now();

  expect(person.name.firstName).toBe("Pedro");
  expect(person.id.isNew).toBeTruthy();
});

test("shall thrown error when name is empty", () => {
  expect(() => PersonBuilder.build().withoutName().now()).toThrow(
    Errors.EMPTY_NAME
  );
});

test("shall throw error when cpf is invalid", () => {
  expect(() => PersonBuilder.build().withoutCPF().now()).toThrow(
    Errors.INVALID_CPF
  );
});

test("shall clone person with changed name", () => {
  const person = PersonBuilder.build().now();
  const clonedPerson = person.clone({ name: "John Doe" });

  expect(clonedPerson.equals(person)).toBeTruthy();
  expect(clonedPerson.cpf.value).toBe(person.cpf.value);
  expect(clonedPerson.name.fullName).toBe("John Doe");
});

test("shall clone person with changed id", () => {
  const person = PersonBuilder.build().now();
  const clonedPerson = person.clone({ id: Id.new.value });

  expect(clonedPerson.diff(person)).toBeTruthy();
  expect(clonedPerson.name.fullName).toBe(person.name.fullName);
  expect(clonedPerson.cpf.value).toBe(person.cpf.value);
});
