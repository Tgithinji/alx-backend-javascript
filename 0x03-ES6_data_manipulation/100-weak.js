export const weakMap = new WeakMap();

let count = 0;

export function queryAPI(endPoint) {
  if (count >= 5) {
    throw new Error('Endpoint load is high');
  }
  count += 1;
  weakMap.set(endPoint, count);
}
