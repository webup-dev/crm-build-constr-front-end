import {required, minLength, email, alpha, maxLength, numeric} from 'vuelidate/lib/validators'
import {alphaSpace, address, alphaSpaceHyphen} from './../../../../shared/validation-rules'

export const validations = {
  title: {
    alphaSpaceHyphen,
    minLength: minLength(2)
  },
  first_name: {
    required,
    alphaSpaceHyphen,
    minLength: minLength(3)
  },
  last_name: {
    required,
    alphaSpaceHyphen,
    minLength: minLength(3)
  },
  departmentId: {
    required,
    minLength: minLength(1)
  },
  statusProfile: {
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
  startDate: {},
  terminationDate: {}
}
