/**
 * Filter Arr by given data
 * {any[]} arr
 * object
 * comparison
 * {any[]}
 */
export function filter(arr: any[], object, comparison) {
  return arr.filter(item => item[comparison] === object[comparison]);
}

/**
 * Make Arr unique
 * {any[]} arr
 * {string} prop
 * {any[]}
 */
export function unique(arr: any[], prop?: string): any[] {
  let distinct: any[] = [];
  let hasData: any[] = [];
  for (let i = 0; i < arr.length; i++) {
    if (hasData.indexOf(arr[i][prop]) === -1) {
      distinct.push(arr[i]);
      hasData.push(arr[i][prop]);
    }
  }

  return distinct;
}
