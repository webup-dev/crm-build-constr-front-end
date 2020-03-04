import {required, integer, alpha} from 'vuelidate/lib/validators'
import {alphaNumSpaceDotCommaHyphen, alphaSpace} from '../../shared/validation-rules'

export const validations = {
  fileInput: {
    id:{
      required,
      integer
    },
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
