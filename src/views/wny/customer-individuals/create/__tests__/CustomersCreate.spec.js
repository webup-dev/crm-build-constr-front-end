import {shallowMount} from '@vue/test-utils'
import CustomersCreate from '@/views/wny/customers/create/CustomersCreate.vue'

describe('CustomersCreate', () => {
  const wrapper = shallowMount(CustomersCreate)
  
  test('is the instance of Vue', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
  
  it('shows correct card header', () => {
    expect(wrapper.html()).toContain('<strong>Create User</strong>')
  });
  
})
