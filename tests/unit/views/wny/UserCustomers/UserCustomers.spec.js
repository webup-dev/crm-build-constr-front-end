// tests/unit/views/wny/UserCustomers/UserCustomers.spec.js

import { shallowMount } from '@vue/test-utils'
import UserCustomers from '../../../../../src/views/wny/user-customers/UserCustomers'

describe('UserCustomers', () => {
  const wrapper = shallowMount(UserCustomers, {
    propsData: {

    }
  });
  it('There is a button Create-New-User-Customer', () => {
    expect(wrapper.findAll('.create-user-customer').length).toEqual(1)
  })
});
