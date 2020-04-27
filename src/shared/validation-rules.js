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

export const alphaSpaceHyphenAnd = (value) => {
  if (typeof value === 'undefined' || value === null || value === '') {
    return true
  }
  return /^[a-zA-Z #&-]*$/.test(value)
};

export const alphaSpaceDotHyphen = (value) => {
  if (typeof value === 'undefined' || value === null || value === '') {
    return true
  }
  return /^[a-zA-Z .-]*$/.test(value)
};

export const alphaSpaceDotCommaHyphen = (value) => {
  if (typeof value === 'undefined' || value === null || value === '') {
    return true
  }
  return /^[a-zA-Z #.,-]*$/.test(value)
};

export const alphaNumSpaceDotCommaHyphen = (value) => {
  if (typeof value === 'undefined' || value === null || value === '') {
    return true
  }
  return /^[0-9a-zA-Z #.,-]*$/.test(value)
};

// 0-9a-zA-Z #'.,-
// !@$%^&*(){}[]:;"<>?\|*+
export const alphaNumSpaceDotCommaHyphenApostrophe = (value) => {
  if (typeof value === 'undefined' || value === null || value === '') {
    return true
  }
  return /^[0-9a-zA-Z #'.,-]*$/.test(value)
};

// 0-9a-zA-Z /,.#-
// !@$%^&*(){}[]:;"<>?\|*+
export const address = (value) => {
  if (typeof value === 'undefined' || value === null || value === '') {
    return true
  }
  return /^[0-9a-zA-Z /,.#-]*$/.test(value)
};

// a-zA-Z -'
// !@#$%^&*(){}[]:;"<>?/\|*+1
export const city = (value) => {
  if (typeof value === 'undefined' || value === null || value === '') {
    return true
  }
  return /^[a-zA-Z '-]*$/.test(value)
};

// !@#$%^&*(){}[]:;"<>?/\|*+1,.
export const name = (value) => {
  if (typeof value === 'undefined' || value === null || value === '') {
    return true
  }
  return /^[a-zA-Z '-]*$/.test(value)
};

// !@#$%^&*(){}[]:;"<>?/\|*+1
export const namePrefix = (value) => {
  if (typeof value === 'undefined' || value === null || value === '') {
    return true
  }
  return /^[a-zA-Z /,.'-]*$/.test(value)
};

export const companyName = (value) => {
  if (typeof value === 'undefined' || value === null || value === '') {
    return true
  }
  return /^[a-zA-Z #'.,&-]*$/.test(value)
};

// 01 )(-
// asAS!@#$%^&*{}[]:;"<>?/\|*+
export const usaPhone = (value) => {
  if (typeof value === 'undefined' || value === null || value === '') {
    return true
  }
  return /^[0-9 )(-]*$/.test(value)
};

export const usaZip = (value) => {
  if (typeof value === 'undefined' || value === null || value === '') {
    return true
  }
  return /^[0-9]{5}(?:-[0-9]{4})?$/.test(value)
};

export const myUrl = (value) => {
  if (typeof value === 'undefined' || value === null || value === '') {
    return true
  }
  return /^(http|https):\/\/[^ "]+$/.test(value)
};
