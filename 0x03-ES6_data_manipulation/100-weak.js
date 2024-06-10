export const weakMap = new WeakMap();

let count = 0;

export function queryAPI(endPoint) {
  count += 1;

  if (count >= 5) {
    throw new Error('Endpoint load is high');
  }

  weakMap.set(endPoint, count);
}
