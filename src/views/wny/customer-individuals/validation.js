import {required, minLength, email, numeric} from 'vuelidate/lib/validators'
import {alphaSpaceHyphen} from '../../../shared/validation-rules'

export const validations = {
  firstName: {
    required,
    minLength: minLength(3),
    alphaSpaceHyphen
  },
  lastName: {
    required,
    minLength: minLength(3),
    alphaSpaceHyphen
  },
  customerType: {
    required
  },
  note: {

  },
  departmentId: {
    required,
    numeric
  },
  email: {
    required,
    email
  },
  password: {
    required,
    minLength: minLength(6),
  }
};
