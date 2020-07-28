import { shallowMount } from '@vue/test-utils'
import RequesterCreate from '../../../../src/views/wny/requesters/RequesterCreate'

test('RequesterCreate', () => {
  // отрисовываем компонент в изоляции
  const wrapper = shallowMount(RequesterCreate)

  // устанавливаем `username` меньше 7 символов, без учёта пробелов
  wrapper.setData({ firstName: '1234567'.repeat(1) })

  // проверяем, что ошибка отобразилась
  expect(wrapper.find('.error').exists()).toBe(true)

  // обновляем имя, чтобы оно было достаточно длинным
  wrapper.setData({ username: 'Александр' })

  // проверяем, что ошибка исчезла
  expect(wrapper.find('.error').exists()).toBe(false)
})
