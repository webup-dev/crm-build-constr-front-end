import {required, integer, alpha} from 'vuelidate/lib/validators'
import {alphaSpace} from '../../shared/validation-rules'

export const validations = {
  name: {
    required,
    alphaSpace
  },
  lsCategoryId: {
    required,
    integer
  },
  organizationId: {
    required,
    integer
  },
  lsStatus: {
    required,
    alpha
  }
};
