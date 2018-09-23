import { shallowMount } from '@vue/test-utils'
import Button from '@/components/Button/Button.vue'

describe('Button.vue', () => {
  it('renders props.text when passed', () => {
    const text = 'test the button'
    const wrapper = shallowMount(Button, {
      propsData: { text }
    })
    expect(wrapper.text()).toMatch(text)
  })
})

describe('Button.vue', () => {
  it('renders props.isDisabled when passed', () => {
    const disabled = 'Button'
    const wrapper = shallowMount(Button, {
      propsData: { disabled }
    })
    expect(wrapper.text()).toMatch(disabled)
  })
})

describe('Button.vue', () => {
  it('renders props.isLoading when passed', () => {
    const loading = 'Button'
    const wrapper = shallowMount(Button, {
      propsData: { loading }
    })
    expect(wrapper.text()).toMatch(loading)
  })
})
/*
describe('Button.vue', () => {
  it('test click event', () => {
    const mockCallBack = jest.fn();
    const ButtonComponent = mount(Button);
    const button = ButtonComponent.find('Button');
    button.simulate('click');
    expect(mockCallBack.mock.calls.length).toEqual(1);
  })
})
*/
