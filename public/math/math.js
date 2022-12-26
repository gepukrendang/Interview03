export const average = (array) => array.reduce((a, b) => a + b) / array.length;
export const max = (array) => array.reduce((a, b) => Math.max(a, b), -Infinity);
export const min = (array) => array.reduce((a, b) => Math.min(a, b), Infinity);
export function median(array) {
  array.sort((a, b) => a - b);
  let middle = Math.floor(array.length / 2);
  let median;
  if (array.length % 2 === 1) {
    median = array[middle];
  } else {
    median = (array[middle - 1] + array[middle]) / 2;
  }
  return median;
}
