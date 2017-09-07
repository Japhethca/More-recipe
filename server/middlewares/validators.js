// contains functions for validating user inputs

const isValidInt = (value) => {
  if (typeof value === 'number') {
    return true;
  }
  return false;
};

const iaValidStr = (value) => {
  if (typeof value === 'string') {
    if (value.trim()) return true;
    else return false;
  }else {
    return false;
  }
};


export { isValidInt, isValidStr };
