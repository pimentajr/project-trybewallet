function isPrimitive(value) {
  if (typeof value !== 'object' || value === null) {
    return true;
  }

  return false;
}

export default function stateClone(original) {
  if (isPrimitive(original) || typeof original === 'function') return original;

  let clone;

  if (!Array.isArray(original)) {
    const entries = Object.entries(original);

    clone = Object.fromEntries(stateClone(entries));
    return clone;
  }

  clone = [];

  for (let i = 0; i < original.length; i += 1) {
    clone.push(stateClone(original[i]));

    if (typeof original[i] === 'function') {
      console.warn('You have a method inside your state.Proceed with caution');
    }
  }

  return clone;
}
