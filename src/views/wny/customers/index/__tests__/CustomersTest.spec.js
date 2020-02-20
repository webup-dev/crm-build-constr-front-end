import {shallowMount} from '@vue/test-utils'
import Customers from '@/views/wny/customers/index/Customers.vue'

describe('Customers', () => {
  const wrapper = shallowMount(Customers)

  test('is the instance of Vue', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('shows correct card header', () => {
    expect(wrapper.html()).toContain('<i class="icon-menu mr-1"></i>Customer Index')
  });

})
