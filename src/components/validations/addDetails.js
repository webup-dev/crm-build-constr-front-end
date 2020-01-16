import {required, email, integer, alpha, numeric} from 'vuelidate/lib/validators'
import {address, city, alphaSpaceDotHyphen, companyName, usaPhone} from '../../shared/validation-rules'

export const validations = {
  user_id: {
    required,
    integer
  },
  prefix: {
    required,
    alpha
  },
  suffix: {
    required,
    alphaSpaceDotHyphen
  },
  first_name: {
    required,
    alpha
  },
  last_name: {
    required,
    alpha
  },
  work_title: {
    companyName
  },
  work_department: {
    companyName
  },
  work_role: {
    alpha
  },
  email_work: {
    email
  },
  email_personal: {
    required,
    email
  },
  statusDetails: {
    required
  },
  phone_home: {
    usaPhone
  },
  phone_work: {
    usaPhone
  },
  phone_extension: {
    usaPhone
  },
  phone_mob: {
    usaPhone
  },
  phone_fax: {
    usaPhone
  },
  line_1: {
    required,
    address
  },
  line_2: {
    required,
    address
  },
  city: {
    required,
    city
  },
  stateAddress: {
    required
  },
  zip: {
    required,
    numeric
  }
};
