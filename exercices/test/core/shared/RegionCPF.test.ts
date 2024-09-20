import { Errors } from "~/core/constants/Errors";
import { RegionCPF } from "~/core/shared/RegionCPF";

test("shall create a valid RegionCPF", () => {
  const region = new RegionCPF(0);

  expect(region.value).toBe(0);
  expect(region.taxRegions).toBe(RegionCPF.RS);
});

test("shall throw error when RegionCPF is invalid", () => {
  expect(() => new RegionCPF(10)).toThrow(
    new Error(Errors.INVALID_REGION_CODE)
  );
});

test("shall compare equals RegionCPFs", () => {
  const region = new RegionCPF(0);
  const region2 = new RegionCPF(0);

  expect(region.equals(region2)).toBe(true);
  expect(region.diff(region2)).toBe(false);
});
