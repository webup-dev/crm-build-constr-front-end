import {required, integer} from 'vuelidate/lib/validators'
import {alphaSpace, alphaNumSpaceDotCommaHyphen} from '../../shared/validation-rules'

export const validations = {
  file: {
    required
  },
  fileInput: {
    description: {
      alphaNumSpaceDotCommaHyphen
    }
  },
  owner: {
    owner_object_type: {
      required,
      alphaSpace
    },
    owner_object_id: {
      required,
      integer
    },
    owner_user_id: {
      required,
      integer
    }
  }
};
