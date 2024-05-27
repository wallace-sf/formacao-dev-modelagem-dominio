import { Entity, EntityProps } from "~/core/shared/Entity";

interface MyClassProps extends EntityProps {
  name?: string;
  age?: number;
}

class MyClass extends Entity<MyClass, MyClassProps> {
  readonly name: string;
  readonly age: number;

  constructor(props: MyClassProps) {
    super(props);
    this.name = props.name ?? "";
    this.age = props.age ?? 0;
  }

  protected _new(props: MyClassProps) {
    return new MyClass(props);
  }
}

test("shall compare two different entities", () => {
  const e1 = new MyClass({ name: "John", age: 30 });
  const e2 = new MyClass({ name: "John", age: 30 });

  expect(e1.equals(e2)).toBe(false);
  expect(e1.diff(e2)).toBe(true);
});

test("shall compare two equals entities with different properties", () => {
  const e1 = new MyClass({ name: "John", age: 30 });
  const e2 = new MyClass({ id: e1.id.value, name: "John", age: 30 });

  expect(e1.equals(e2)).toBe(true);
  expect(e1.diff(e2)).toBe(false);
});

test("shall clone a entity with different properties", () => {
  const e2Name = "Jane";
  const e2Age = 25;

  const e1 = new MyClass({ name: "John", age: 30 });
  const e2 = e1.clone({ name: e2Name, age: e2Age });

  expect(e2.equals(e1)).toBe(true);
  expect(e2.name).toBe(e2Name);
  expect(e2.age).toBe(e2Age);
});
