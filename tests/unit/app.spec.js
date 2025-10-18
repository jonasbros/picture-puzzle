import { shallowMount } from '@vue/test-utils'
import App from '@/App.vue'

describe('Home page loads', () => {
  it('renders correct heading text', () => {
    const wrapper = shallowMount(App, {
      stubs: ['router-view']
    })
    expect(wrapper.find('h1').text()).toMatch('IMAGE PUZZLE')
  })
})
