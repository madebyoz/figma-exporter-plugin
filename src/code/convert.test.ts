import { ORIGINAL, KEBAB_CASE, SNAKE_CASE, CAMEL_CASE } from "../constants";
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

describe('inConvention', () => {
  let value: string;

  it("converts the input to the expected format", () => {
    value = "FoO+=~BAr";

    expect(inConvention(ORIGINAL, value)).toEqual(value);
    expect(inConvention(KEBAB_CASE, value)).toEqual("foo-bar");
    expect(inConvention(SNAKE_CASE, value)).toEqual("foo_bar");
    expect(inConvention(CAMEL_CASE, value)).toEqual("fooBar");
  });

  it('keeps the / as directory separator', () => {
    value = "Dir / Hello World / Image Test";

    expect(inConvention(ORIGINAL, value)).toEqual("Dir/Hello World/Image Test");
    expect(inConvention(KEBAB_CASE, value)).toEqual("dir/hello-world/image-test");
    expect(inConvention(SNAKE_CASE, value)).toEqual("dir/hello_world/image_test");
    expect(inConvention(CAMEL_CASE, value)).toEqual("dir/helloWorld/imageTest");
  });
});