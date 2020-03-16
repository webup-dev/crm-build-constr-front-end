import {required} from 'vuelidate/lib/validators'
import {alphaSpace, alphaNumSpaceDotCommaHyphen} from '../../shared/validation-rules'

export const validations = {
  name: {
    required,
    alphaSpace
  },
  lsDescription: {
      alphaNumSpaceDotCommaHyphen
  }
};
