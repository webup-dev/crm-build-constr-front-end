import {required, minLength, numeric} from 'vuelidate/lib/validators'
import {alphaSpaceHyphen} from '../../../shared/validation-rules'

export const validations = {
  user_id: {
    required,
    numeric
  },
  name: {
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
  }
};
