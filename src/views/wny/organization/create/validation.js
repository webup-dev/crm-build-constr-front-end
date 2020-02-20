import {required, minLength, maxLength, numeric} from 'vuelidate/lib/validators'
import {alphaSpaceDotCommaHyphen} from './../../../../shared/validation-rules'

export const validations = {
  name: {
    required,
    alphaSpaceDotCommaHyphen,
    minLength: minLength(2)
  },
  order: {
    required,
    numeric,
    maxLength: maxLength(3)
  },
  parent_id: {
    numeric
  }
};
