export interface MemoizePropertyDescriptor<T, U extends any[], R>
  extends PropertyDescriptor {
  value?: (this: T, ...args: U) => R;
}

const PREV = Symbol("memoizeOnePrev");
const RESULT = Symbol("memoizeOneResult");

/**
 * Memoize the last call to a function.
 */
export function memoizeOne<T, U extends any[], R>(
  target: any,
  name: PropertyKey,
  descriptor: MemoizePropertyDescriptor<T, U, R>
) {
  const func = descriptor.value;

  if (typeof func !== "function") {
    throw new TypeError("Property descriptor expected to be a function");
  }

  descriptor.value = function memoizeOne(
    this: T & { [PREV]?: U; [RESULT]?: R },
    ...args: U
  ) {
    const shouldUpdate = this[PREV] === undefined || !equal(this[PREV]!, args);

    if (shouldUpdate) {
      this[PREV] = args;
      this[RESULT] = func.apply(this, args);
    }

    return this[RESULT]!;
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
