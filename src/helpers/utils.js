export const cloneObject = (obj) => JSON.parse(JSON.stringify(obj));

export const roundCurrency = (currency) => (Math.round(currency * 1e2) / 1e2);
