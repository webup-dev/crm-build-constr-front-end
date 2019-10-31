import {shallowMount} from '@vue/test-utils'
import BooksStatic from '@/views/wny/books/index/BooksStatic.vue'

describe('BooksStatic', () => {
  test('is the instance of Vue', () => {
    const wrapper = shallowMount(BooksStatic)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})

describe('snapshot - Table Header', () => {
  const wrapper = shallowMount(BooksStatic)
  
  it('shows correct table header', () => {
    expect(wrapper.html()).toContain('<i class="icon-menu mr-1"></i>Book Index')
  });
})

describe('Table', () => {
  it('it should display the right number of table rows', () => {
    const wrapper = shallowMount(BooksStatic)
    expect(wrapper.findAll('v-client-table').length).toBe(12)
  });
});
