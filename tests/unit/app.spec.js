import { shallowMount } from '@vue/test-utils'
import App from '@/App.vue'

describe('Home page loads', () => {
  it('renders correct text', () => {
    const wrapper = shallowMount(App, {
      stubs: ['router-view']
    })
    expect(wrapper.text()).toMatch('IMAGE PUZZLE')
  })
})
