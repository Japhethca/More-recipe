export default (name, char) => {
  const modifiedName = name.toLowerCase().trim().split(' ').join(char);
  return modifiedName;
};
