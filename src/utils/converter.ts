import type { Status } from "@/interfaces/debates.interface";

export const getNumberFromString = (str: string) =>
  Number(str.replace(/[^0-9]/g, ""));

export const convertBigIntArrayToNumber = (arr: BigInt[]) =>
  arr.map((item) => Number(item));

export const toOptionalFixed = (num: string, digits: number) =>
  `${Number.parseFloat(Number(num).toFixed(digits))}`;

export const convertEnumToString = (enumValue: number): Status => {
  switch (enumValue) {
    case 0:
      return "Waiting Members";
    case 1:
      return "Going";
    case 2:
      return "Completed";
    default:
      return "Unknown";
  }
};
