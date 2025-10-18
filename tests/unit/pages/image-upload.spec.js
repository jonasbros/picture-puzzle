import { shallowMount } from '@vue/test-utils'
import ImageUploadPage from '@/pages/ImageUploadPage.vue'

describe('Image upload page loads', () => {
  it('renders correct text', () => {
    const wrapper = shallowMount(ImageUploadPage)
    expect(wrapper.text()).toMatch('Upload an image to start')
  })

  it('file input is rendered', () => {
    const wrapper = shallowMount(ImageUploadPage)
    const input = wrapper.find('input[type="file"]')
    expect(input.exists()).toBe(true)
  })
})


describe('Uploading Image', () => {
    it('uploading image shows puzzle area', async () => {
      const mockReadAsDataURL = jest.fn(function () {
        this.result = 'data:image/png;base64,fakeimage'
        this._onLoad && this._onLoad({ target: { result: this.result } })
      })
  
      global.FileReader = jest.fn(() => ({
        _onLoad: null,
        addEventListener: function (event, callback) {
          if (event === 'load') this._onLoad = callback
        },
        readAsDataURL: mockReadAsDataURL,
        result: null
      }))
  
      const wrapper = shallowMount(ImageUploadPage)
  
      const file = new File(['dummy content'], 'example.png', { type: 'image/png' })
      const event = { target: { files: [file] } }
  
      wrapper.vm.handleUpload(event)
      await wrapper.vm.$nextTick()
  
      expect(wrapper.vm.previewSrc).toBe('data:image/png;base64,fakeimage')
      expect(wrapper.vm.startPuzzle).toBe(true)
      expect(wrapper.findComponent({ name: 'puzzle-area' }).exists()).toBe(true)
    })
})

describe('Error handling on upload', () => {
    
})