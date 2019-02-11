export interface MemoizePropertyDescriptor<T, U extends any[], R>
  extends PropertyDescriptor {
  value?: (this: T, ...args: U) => R;
}

/**
 * Memoize the last call to a function.
 */
export function memoizeOne<T, U extends any[], R>(
  target: any,
  name: PropertyKey,
  descriptor: MemoizePropertyDescriptor<T, U, R>
) {
  const func = descriptor.value;
  let prev: U | undefined;
  let result: R | undefined;

  if (typeof func !== "function") {
    throw new TypeError("Property descriptor expected to be a function");
  }

  descriptor.value = function(this: T, ...args: U) {
    const shouldUpdate = prev === undefined || !equal(prev, args);

    if (shouldUpdate) {
      prev = args;
      result = func.apply(this, args);
    }

    return result!;
  };
}

/**
 * Check if two arrays are equal.
 */
function equal<T extends any[]>(prev: T, args: T): boolean {
  const len = args.length;

  if (prev.length !== len) return false;

  for (let i = 0; i < len; i++) {
    if (!Object.is(prev[i], args[i])) return false;
  }

  return true;
}
