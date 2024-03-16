export default function updateUniqueItems(map) {
  if (!(map instanceof Map)) throw new Error('Cannot process');

  // update the quantity to 100 where it is 1
  map.forEach((value, key) => {
    if (value === 1) map.set(key, 100);
  });

  return map;
}
