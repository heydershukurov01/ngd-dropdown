export function filter(arr: any[], object, comparison) {
  return arr.filter(item => item[comparison] === object[comparison]);
}
