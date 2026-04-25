export const capitalizeWord = (
  word: string,
  capitalizeMultipleStrings = false,
): string => {
  if (!word) {
    return "";
  }

  const tokenizedWord = word.split(" ");

  if (capitalizeMultipleStrings) {
    return tokenizedWord
      .map((token) => {
        return token.charAt(0).toUpperCase() + token.slice(1).toLowerCase();
      })
      .join(" ");
  }

  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
};

export const sortObjectArray = <T>(
  objectArray: T[],
  orderKey: keyof T,
  order: "asc" | "desc",
): T[] => {
  if (!objectArray || !objectArray.length) {
    return [];
  }

  if (typeof objectArray[0] !== "object") {
    return [];
  }

  const allValidObjects = objectArray.every((item) => {
    return item !== null && item !== undefined && typeof item === "object";
  });

  if (!allValidObjects) {
    return [];
  }

  if (order === "asc") {
    return objectArray.sort((a, b) => (a[orderKey] > b[orderKey] ? 1 : -1));
  } else {
    return objectArray.sort((a, b) => (a[orderKey] < b[orderKey] ? 1 : -1));
  }
};

export const deepEqual = <T>(a: T, b: T): boolean => {
  if (a === b) return true;

  if (a === null || b === null) return false;
  if (typeof a !== typeof b) return false;

  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    return a.every((item, i) => deepEqual(item, b[i]));
  }

  if (typeof a === "object" && typeof b === "object") {
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);

    if (keysA.length !== keysB.length) return false;

    return keysA.every((key) =>
      deepEqual(
        (a as Record<string, unknown>)[key],
        (b as Record<string, unknown>)[key],
      ),
    );
  }

  return false;
};

export const excludeFromObject = <T extends object>(
  objectParam: T,
  keys: (keyof T)[],
): T => {
  const newObject: Partial<T> = {};

  for (const objectKey of Object.keys(objectParam)) {
    if (!keys.includes(objectKey as keyof T)) {
      newObject[objectKey as keyof T] = objectParam[objectKey as keyof T];
    }
  }

  return newObject as T;
};
