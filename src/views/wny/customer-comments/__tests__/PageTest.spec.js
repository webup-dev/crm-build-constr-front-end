import {shallowMount} from '@vue/test-utils'
import Page from '@/views/wny/customer-comments/Page.vue'

describe('Page', () => {
  const wrapper = shallowMount(Page);

  test('is the instance of Vue', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  });

  // it('shows correct card header', () => {
  //   expect(wrapper.html()).toContain('<i class="icon-menu mr-1"></i>Customer Index')
  // });

});
