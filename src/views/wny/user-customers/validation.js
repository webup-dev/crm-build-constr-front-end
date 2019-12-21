import {required, minLength, email} from 'vuelidate/lib/validators'

export const validations = {
  customerId: {
    required,
    minLength: minLength(1)
  },
  email: {
    required,
    email
  }
};
