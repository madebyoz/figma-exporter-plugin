import { KEBAB_CASE, SNAKE_CASE, CAMEL_CASE } from '../constants';

export const capitalize = (value: string): string => {
  if (value.length < 2)
    return value.toUpperCase();
  return value[0].toUpperCase() + value.substr(1).toLowerCase();
}

export const toKebabCase = (value: string): string => {
  const regex = /[\s\W]+/g
  return value.replace(regex, '-').toLowerCase();
}

export const toSnakeCase = (value: string): string => {
  const regex = /[\s\W]+/g
  return value.replace(regex, '_').toLowerCase();
}

export const toCamelCase = (value: string): string => {
  const result = value.split(/[\s\W]/g).map((str, idx) => {
    return idx == 0 ? str.toLowerCase() : capitalize(str);
  });
  return result.join('');
}

export const inConvention = (convention: string, value: string): string => {
  switch (convention) {
    case KEBAB_CASE:
      return toKebabCase(value);

    case SNAKE_CASE:
      return toSnakeCase(value);

    case CAMEL_CASE:
      return toCamelCase(value);

    default:
      return value;
    }
}