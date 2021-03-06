import {required, minLength} from 'vuelidate/lib/validators'
// import {address, alphaSpaceHyphen} from '../../../shared/validation-rules'

export const validations = {
  customerId: {
    required,
    minLength: minLength(1)
  },
  email: {
    required
  }
};
