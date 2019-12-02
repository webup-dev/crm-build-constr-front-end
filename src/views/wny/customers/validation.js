import {required, minLength, maxLength, email, numeric} from 'vuelidate/lib/validators'
import {alphaSpaceHyphen, address, city} from '../../../shared/validation-rules'

export const validations = {
  name: {
    required,
    minLength: minLength(3),
    alphaSpaceHyphen
  },
  customerType: {
    required
  },
  departmentId: {
    required,
    numeric
  },
  line_1: {
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
