import {required, integer, alpha} from 'vuelidate/lib/validators'
import {alphaSpaceDotHyphen, alphaSpace} from '../../shared/validation-rules'

export const validations = {
  fileInput: {
    id:{
      required,
      integer
    },
    description: {
      alphaSpaceDotHyphen
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
