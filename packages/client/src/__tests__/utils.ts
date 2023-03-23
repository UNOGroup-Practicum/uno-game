export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Удаляем поле meta из результатов, т.к. там requestId отличается, а нам важны только type и payload
export const withoutMetaKey = (arr: Record<"meta" | "payload" | "type", unknown>[]) => {
  return arr.map((obj) => ({
    payload: obj.payload,
    type: obj.type,
  }));
};
