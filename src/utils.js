export function elementToCastOn(index) {
  let result = "1"; // string element 1 or 2
  if (index === 0) {
    result = "1";
  } else if (index % 2 === 0) {
    result = "2";
  } else {
    result = "1";
  }
  return result;
}
