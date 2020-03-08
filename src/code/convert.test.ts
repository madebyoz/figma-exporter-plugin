import {
  toSnakeCase,
  toKebabCase,
  toCamelCase,
  capitalize,
  inConvention
} from "./convert";

describe('toKebabCase', () => {
  it("handles an empty string correctly", () => {
    const input = "";
    const output = "";
    expect(toKebabCase(input)).toEqual(output);
  });

  it('should return result in lower case', () => {
    const input = "HeLlo wOrlD";
    const output = "hello-world";
    expect(toKebabCase(input)).toEqual(output);
  });

  it("converts all non alphanumeric to -", () => {
    const input = "FoO+/=~BAr";
    const output = "foo-bar";
    expect(toKebabCase(input)).toEqual(output);
  });
});

describe('toSnakeCase', () => {
  it("handles an empty string correctly", () => {
    const input = "";
    const output = "";
    expect(toSnakeCase(input)).toEqual(output);
  });

  it('should return result in lower case', () => {
    const input = "HeLlo wOrlD";
    const output = "hello_world";
    expect(toSnakeCase(input)).toEqual(output);
  });

  it("converts all non alphanumeric to _", () => {
    const input = "FoO+/=~BAr";
    const output = "foo_bar";
    expect(toSnakeCase(input)).toEqual(output);
  });
});


describe('toCamelCase', () => {
  it("handles an empty string correctly", () => {
    const input = "";
    const output = "";
    expect(toCamelCase(input)).toEqual(output);
  });

  it('should return result in lower case', () => {
    const input = "HeLlo wOrlD";
    const output = "helloWorld";
    expect(toCamelCase(input)).toEqual(output);
  });

  it("converts all non alphanumeric to _", () => {
    const input = "FoO+/=~BAr";
    const output = "fooBar";
    expect(toCamelCase(input)).toEqual(output);
  });
});

describe('capitalize', () => {
  it("upcase the whole string if it's too short", () => {
    expect(capitalize("n")).toEqual("N");
    expect(capitalize("")).toEqual("");
  });

  it("converts the first letter to uppercase and the rest to lowercase", () => {
    expect(capitalize("heLLoWoRld")).toEqual("Helloworld");
    expect(capitalize("conVenTIOn")).toEqual("Convention");
  });
});