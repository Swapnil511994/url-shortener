export const base36Converter = (input) => {
  if (typeof input !== "number" || isNaN(input)) {
    return null;
  }

  return input.toString(36);
};
