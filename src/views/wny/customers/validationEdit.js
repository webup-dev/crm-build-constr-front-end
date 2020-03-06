import {required, minLength, maxLength, numeric} from 'vuelidate/lib/validators'
import {alphaSpaceHyphenAnd, address, city} from '../../../shared/validation-rules'

export const validations = {
  name: {
    required,
    minLength: minLength(3),
    alphaSpaceHyphenAnd
  },
  departmentId: {
    required,
    numeric
  },
  customerType: {
    required
  },
  city: {
    required,
    city
  },
  line_1: {
    required,
    address
  },
  line_2: {
    address
  },
  state: {

  },
  zip: {
    numeric,
    maxLength: maxLength(7)
  }
};
