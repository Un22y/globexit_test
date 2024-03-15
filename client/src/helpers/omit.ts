export const omit = <T extends object, K extends keyof T>(
  obj: T,
  keysToOmit: K[]
): Omit<T, K> => {
  const copy = { ...obj };
  keysToOmit.forEach((key) => {
    delete copy[key];
  });
  return copy;
};
