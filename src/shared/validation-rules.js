export const alphaNumSpace = (value) => {
  if (typeof value === 'undefined' || value === null || value === '') {
    return true
  }
  return /^[0-9a-zA-Z #]*$/.test(value)
};

export const alphaSpace = (value) => {
  if (typeof value === 'undefined' || value === null || value === '') {
    return true
  }
  return /^[a-zA-Z #]*$/.test(value)
};

export const alphaSpaceHyphen = (value) => {
  if (typeof value === 'undefined' || value === null || value === '') {
    return true
  }
  return /^[a-zA-Z #-]*$/.test(value)
};

export const address = (value) => {
  if (typeof value === 'undefined' || value === null || value === '') {
    return true
  }
  return /^[0-9a-zA-Z /,.#-]*$/.test(value)
};
