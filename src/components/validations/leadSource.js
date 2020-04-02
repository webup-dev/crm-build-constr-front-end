import {required} from 'vuelidate/lib/validators'
import {alphaNumSpaceDotCommaHyphenApostrophe} from '../../shared/validation-rules'

export const validations = {
  name: {
    required,
    alphaNumSpaceDotCommaHyphenApostrophe
  },
  lsDescription: {
      alphaNumSpaceDotCommaHyphenApostrophe
  }
};
