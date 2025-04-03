export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const asyncForEach = async (arr, cb) => {
  if (!Array.isArray(arr)) {
    throw new TypeError("arr must be an array");
  }
  let len = arr.length;
  for (let i = 0; i < len; i++) {
    await cb(arr[i], i, arr);
  }
};

const helpers = {
  capitalizeFirstLetter,
  asyncForEach,
};

export default helpers;
