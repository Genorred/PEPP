import { isEqual, omitBy } from "lodash";

export function getChangedFields<T extends Record<any, any>>(original: T, updated: T) {
  return omitBy(updated, (value, key) => isEqual(value, original[key]));
}