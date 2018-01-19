/**
 * @description converts a string with spaces to a character seperated string
 * @param {string} name
 * @param {char} char
 * @return {string} slugified string
 */
export default (name, char) => {
  const modifiedName = name.toLowerCase().trim().split(' ').join(char);
  return modifiedName;
};
