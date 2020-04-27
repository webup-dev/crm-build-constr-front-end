import {required, email, integer, url} from 'vuelidate/lib/validators'
import {address, city, alphaSpace, alphaNumSpaceDotCommaHyphenApostrophe, usaPhone, name, namePrefix, usaZip, myUrl} from '../../shared/validation-rules'

export const validations = {
  prefix: {
    namePrefix
  },
  suffix: {
    namePrefix
  },
  firstName: {
    name
  },
  lastName: {
    name
  },
  organizationId: {
    required,
    integer
  },
  phoneHome: {
    usaPhone
  },
  phoneWork: {
    usaPhone
  },
  phoneExtension: {
    usaPhone
  },
  phoneMob1: {
    usaPhone
  },
  phoneMob2: {
    usaPhone
  },
  fax: {
    usaPhone
  },
  emailWork: {
    email
  },
  emailPersonal: {
    email
  },
  addressLine1: {
    address
  },
  addressLine2: {
    address
  },
  city: {
    city
  },
  addressState: {
    alphaSpace
  },
  zip: {
    usaZip
  },
  website: {
    url
  },
  otherSource: {
    alphaNumSpaceDotCommaHyphenApostrophe
  },
  note: {
    alphaNumSpaceDotCommaHyphenApostrophe
  }
};
