import {required, integer} from 'vuelidate/lib/validators'
import {alphaNumSpaceDotCommaHyphenApostrophe} from '../../shared/validation-rules'

export const validations = {
  name: {
    required,
    alphaNumSpaceDotCommaHyphenApostrophe
  },
  organizationId: {
    required,
    integer
  },
  parentId: {
    integer
  }
};
