import { shallowMount, mount } from '@vue/test-utils'
import RequesterCreate from '../../../../src/views/wny/requesters/RequesterCreate'

describe('RequesterCreate', () => {
  it('отрисовывает firstName и правильно реагирует на пользовательский ввод', () => {
    const wrapper = mount(RequesterCreate, {
      data() {
        return {
          firstName: '111'
        }
      }
    })

    // посмотреть, отобразилось ли сообщение
    expect(wrapper.find('#firstName').text()).toEqual('111')

    // проверить, что ошибка отрисовалась
    expect(wrapper.find('.error').exists()).toBeTruthy()

    // обновить `username` и проверить, что ошибка больше не отрисовалась
    wrapper.setData({ username: 'Александр' })
    expect(wrapper.find('.error').exists()).toBeFalsy()
  })
})
