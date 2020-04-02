import {required, integer, alpha} from 'vuelidate/lib/validators'
import {alphaNumSpaceDotCommaHyphenApostrophe} from '../../shared/validation-rules'

export const validations = {
  name: {
    required,
    alphaNumSpaceDotCommaHyphenApostrophe
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
