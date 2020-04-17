import {required, integer, alpha} from 'vuelidate/lib/validators'
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
  workflowType: {
    required,
    alpha
  },
  description: {
    alphaNumSpaceDotCommaHyphenApostrophe
  }
};
