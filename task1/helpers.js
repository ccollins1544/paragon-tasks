export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const helpers = {
  capitalizeFirstLetter,
};

export default helpers;
