import { getChangedFields } from "@/shared/utils/getChangedFields";

describe("getChangedFields", () => {
  const object = {
    field1: "qwerty",
    field2: "qwerty2"
  };
  it("No changes", () => {
    const result = getChangedFields(object, object);
    expect(result).toEqual({});
  });
  it("One field was changed", () => {
    const changedFields = {
      field2: "qwerty"
    };
    const result = getChangedFields(object, Object.assign({}, object, changedFields));
    expect(result).toEqual(changedFields);
  });
  it("All fields was changed", () => {
    const result = getChangedFields({ field1: "xd", field2: "notXD" }, object);
    expect(result).toEqual(object);
  });
});