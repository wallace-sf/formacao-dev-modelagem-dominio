import { Errors } from "~/core/constants/Errors";
import { CPF } from "~/core/shared/CPF";

test("shall not validate bad cpf", () => {
  expect(CPF.isValid(undefined as unknown as string)).toBe(false);
  expect(CPF.isValid("")).toBe(false);
});

test("shall throw error when cpf is invalid: bad format", () => {
  expect(CPF.isValid("123")).toBe(false);
  expect(CPF.isValid("1234")).toBe(false);
  expect(CPF.isValid("1234567")).toBe(false);
  expect(CPF.isValid("123.456.789-0")).toBe(false);
});

test("shall throw error when cpf is invalid: bad verifier digit", () => {
  expect(CPF.isValid("123.456.789-00")).toBe(false);
});

test("shall validate for good vd format", () => {
  expect(CPF.isValid("280.012.389-38")).toBe(true);
  expect(CPF.isValid("346.885.650-46")).toBe(true);
  expect(CPF.isValid("028.777.810-03")).toBe(true);
  expect(CPF.isValid("088.535.530-06")).toBe(true);
});

test("shall return vd format", () => {
  expect(new CPF("280.012.389-38").verifierDigit).toBe("38");
  expect(new CPF("346.885.650-46").verifierDigit).toBe("46");
  expect(new CPF("028.777.810-03").verifierDigit).toBe("03");
  expect(new CPF("088.535.530-06").verifierDigit).toBe("06");
});

test("shall throw error when id is invalid", () => {
  expect(() => new CPF()).toThrow(new Error(Errors.INVALID_CPF));
  expect(() => new CPF("123")).toThrow(new Error(Errors.INVALID_CPF));
});

test("shall throw error when vd is invalid", () => {
  expect(() => new CPF("123.456.789-00")).toThrow(
    new Error(Errors.INVALID_CPF)
  );
});

test("shall return formatted cpf", () => {
  expect(new CPF("28001238938").formatted).toBe("280.012.389-38");
  expect(new CPF("34688565046").formatted).toBe("346.885.650-46");
  expect(new CPF("02877781003").formatted).toBe("028.777.810-03");
  expect(new CPF("088.535.530-06").formatted).toBe("088.535.530-06");
});

test("shall return cpf raw value", () => {
  expect(new CPF("28001238938").value).toBe("28001238938");
  expect(new CPF("34688565046").value).toBe("34688565046");
  expect(new CPF("028.777.810-03").value).toBe("02877781003");
  expect(new CPF("088.535.530-06").value).toBe("08853553006");
});
