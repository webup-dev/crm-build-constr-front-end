import {required, minLength, email, numeric} from 'vuelidate/lib/validators'
import {address, alphaSpaceHyphen, alphaNumSpaceDotCommaHyphenApostrophe} from '../../shared/validation-rules'

export const validations = {
  name: {
    required,
    alphaSpaceHyphen,
    minLength: minLength(3)
  },
  leadTypeId: {
    required
  },
  leadStatusId: {
    required
  },
  declinedReasonOther: {
    alphaNumSpaceDotCommaHyphenApostrophe
  },
  organizationId: {
    required,
    minLength: minLength(1)
  },
  phone_home: {
    minLength: minLength(7)
  },
  phone_mob: {
    minLength: minLength(7)
  },
  phone_work: {
    minLength: minLength(7)
  },
  phone_extension: {
    numeric
  },
  email_personal: {
    email
  },
  email_work: {
    email
  },
  address_line_1: {
    required,
    address
  },
  address_line_2: {
    address
  },
  city: {
    required
  },
  state: {
    required
  },
  zip: {
    required
  },
  dueDate: {},
  anticipatedProjectDate: {}
}
