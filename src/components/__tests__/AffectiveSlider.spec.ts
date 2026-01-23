import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import AffectiveSlider from '../AffectiveSlider.vue'

describe('AffectiveSlider', () => {
  let wrapper

  beforeEach(() => {
    // Reset Math.random mock before each test
    vi.restoreAllMocks()
  })

  describe('Component Rendering', () => {
    it('should render the component', async () => {
      wrapper = mount(AffectiveSlider)
      await flushPromises()
      expect(wrapper.find('.affective-slider').exists()).toBe(true)
    })

    it('should render two slider containers', async () => {
      wrapper = mount(AffectiveSlider)
      await flushPromises()
      const containers = wrapper.findAll('.as-container')
      expect(containers).toHaveLength(2)
    })

    it('should render slider inputs', async () => {
      wrapper = mount(AffectiveSlider)
      await flushPromises()
      const sliders = wrapper.findAll('.as-slider')
      expect(sliders).toHaveLength(2)
    })

    it('should render icons for both sliders', async () => {
      wrapper = mount(AffectiveSlider)
      await flushPromises()
      const icons = wrapper.findAll('.as-icon')
      // 2 sliders * 2 icons each (left and right) = 4 icons
      expect(icons).toHaveLength(4)
    })

    it('should render intensity cue images', async () => {
      wrapper = mount(AffectiveSlider)
      await flushPromises()
      const intensityCues = wrapper.findAll('.as-intensity-cue img')
      expect(intensityCues).toHaveLength(2)
    })
  })

  describe('Props', () => {
    it('should accept pleasureValue prop', () => {
      wrapper = mount(AffectiveSlider, {
        props: { pleasureValue: 0.7 }
      })
      expect(wrapper.vm.pleasure).toBe(0.7)
    })

    it('should accept arousalValue prop', () => {
      wrapper = mount(AffectiveSlider, {
        props: { arousalValue: 0.3 }
      })
      expect(wrapper.vm.arousal).toBe(0.3)
    })

    it('should have default values of 0.5 for both sliders', () => {
      wrapper = mount(AffectiveSlider)
      expect(wrapper.vm.pleasure).toBe(0.5)
      expect(wrapper.vm.arousal).toBe(0.5)
    })

    it('should accept custom imagePath', () => {
      wrapper = mount(AffectiveSlider, {
        props: { imagePath: '/custom/path/' }
      })
      expect(wrapper.vm.imagePath).toBe('/custom/path/')
    })

    it('should render pleasure labels when provided', async () => {
      wrapper = mount(AffectiveSlider, {
        props: {
          pleasureLeftLabel: 'Sad',
          pleasureRightLabel: 'Happy'
        }
      })
      await flushPromises()
      const labels = wrapper.findAll('.as-icon-label')
      const labelTexts = labels.map(l => l.text())
      expect(labelTexts).toContain('Sad')
      expect(labelTexts).toContain('Happy')
    })

    it('should render arousal labels when provided', async () => {
      wrapper = mount(AffectiveSlider, {
        props: {
          arousalLeftLabel: 'Sleepy',
          arousalRightLabel: 'Awake'
        }
      })
      await flushPromises()
      const labels = wrapper.findAll('.as-icon-label')
      const labelTexts = labels.map(l => l.text())
      expect(labelTexts).toContain('Sleepy')
      expect(labelTexts).toContain('Awake')
    })
  })

  describe('Props Validation', () => {
    it('should validate pleasureValue is between 0 and 1', () => {
      const validator = AffectiveSlider.props.pleasureValue.validator
      expect(validator(0)).toBe(true)
      expect(validator(0.5)).toBe(true)
      expect(validator(1)).toBe(true)
      expect(validator(-0.1)).toBe(false)
      expect(validator(1.1)).toBe(false)
    })

    it('should validate arousalValue is between 0 and 1', () => {
      const validator = AffectiveSlider.props.arousalValue.validator
      expect(validator(0)).toBe(true)
      expect(validator(0.5)).toBe(true)
      expect(validator(1)).toBe(true)
      expect(validator(-0.1)).toBe(false)
      expect(validator(1.1)).toBe(false)
    })
  })

  describe('Slider Input Handling', () => {
    it('should update pleasure value on input', async () => {
      wrapper = mount(AffectiveSlider)
      await flushPromises()
      const pleasureSlider = wrapper.find('input[name="AS-pleasure"]')
      
      await pleasureSlider.setValue(0.8)
      expect(wrapper.vm.pleasure).toBe(0.8)
    })

    it('should update arousal value on input', async () => {
      wrapper = mount(AffectiveSlider)
      await flushPromises()
      const arousalSlider = wrapper.find('input[name="AS-arousal"]')
      
      await arousalSlider.setValue(0.3)
      expect(wrapper.vm.arousal).toBe(0.3)
    })

    it('should emit update:pleasureValue event', async () => {
      wrapper = mount(AffectiveSlider)
      await flushPromises()
      const pleasureSlider = wrapper.find('input[name="AS-pleasure"]')
      
      await pleasureSlider.setValue(0.8)
      expect(wrapper.emitted('update:pleasureValue')).toBeTruthy()
      expect(wrapper.emitted('update:pleasureValue')![0]).toEqual([0.8])
    })

    it('should emit update:arousalValue event', async () => {
      wrapper = mount(AffectiveSlider)
      await flushPromises()
      const arousalSlider = wrapper.find('input[name="AS-arousal"]')
      
      await arousalSlider.setValue(0.3)
      expect(wrapper.emitted('update:arousalValue')).toBeTruthy()
      expect(wrapper.emitted('update:arousalValue')![0]).toEqual([0.3])
    })

    it('should emit change event with both values', async () => {
      wrapper = mount(AffectiveSlider)
      await flushPromises()
      const pleasureSlider = wrapper.find('input[name="AS-pleasure"]')
      
      await pleasureSlider.setValue(0.7)
      expect(wrapper.emitted('change')).toBeTruthy()
      expect(wrapper.emitted('change')![0]).toEqual([{ pleasure: 0.7, arousal: 0.5 }])
    })
  })

  describe('Interaction Tracking', () => {
    it('should emit interacted event on first mousedown', async () => {
      wrapper = mount(AffectiveSlider)
      await flushPromises()
      const pleasureSlider = wrapper.find('input[name="AS-pleasure"]')
      
      await pleasureSlider.trigger('mousedown')
      expect(wrapper.emitted('interacted')).toBeTruthy()
      expect(wrapper.emitted('interacted')![0]).toEqual([{
        type: 'pleasure',
        pleasure: 0.5,
        arousal: 0.5
      }])
    })

    it('should emit interacted event on first touchstart', async () => {
      wrapper = mount(AffectiveSlider)
      await flushPromises()
      const arousalSlider = wrapper.find('input[name="AS-arousal"]')
      
      await arousalSlider.trigger('touchstart')
      expect(wrapper.emitted('interacted')).toBeTruthy()
      expect(wrapper.emitted('interacted')![0]).toEqual([{
        type: 'arousal',
        pleasure: 0.5,
        arousal: 0.5
      }])
    })

    it('should only emit interacted event once per slider', async () => {
      wrapper = mount(AffectiveSlider)
      await flushPromises()
      const pleasureSlider = wrapper.find('input[name="AS-pleasure"]')
      
      await pleasureSlider.trigger('mousedown')
      await pleasureSlider.trigger('mousedown')
      await pleasureSlider.trigger('touchstart')
      
      expect(wrapper.emitted('interacted')).toHaveLength(1)
    })
  })

  describe('Slider Order', () => {
    it('should randomize slider order when randomizeOrder is true', () => {
      // Mock Math.random to return different values
      const mockRandom = vi.spyOn(Math, 'random')
      
      mockRandom.mockReturnValue(0.3)
      wrapper = mount(AffectiveSlider, {
        props: { randomizeOrder: true }
      })
      const order1 = [...wrapper.vm.sliderOrder]
      wrapper.unmount()
      
      mockRandom.mockReturnValue(0.7)
      wrapper = mount(AffectiveSlider, {
        props: { randomizeOrder: true }
      })
      const order2 = [...wrapper.vm.sliderOrder]
      
      // Orders should be different
      expect(order1).not.toEqual(order2)
    })

    it('should have fixed order when randomizeOrder is false', () => {
      wrapper = mount(AffectiveSlider, {
        props: { randomizeOrder: false }
      })
      expect(wrapper.vm.sliderOrder).toEqual(['pleasure', 'arousal'])
    })
  })

  describe('Image Paths', () => {
    it('should use correct image paths for pleasure slider', () => {
      wrapper = mount(AffectiveSlider, {
        props: { imagePath: '/images/' }
      })
      
      const leftImage = wrapper.vm.getLeftImage('pleasure')
      const rightImage = wrapper.vm.getRightImage('pleasure')
      
      expect(leftImage).toBe('/images/AS_unhappy.png')
      expect(rightImage).toBe('/images/AS_happy.png')
    })

    it('should use correct image paths for arousal slider', () => {
      wrapper = mount(AffectiveSlider, {
        props: { imagePath: '/images/' }
      })
      
      const leftImage = wrapper.vm.getLeftImage('arousal')
      const rightImage = wrapper.vm.getRightImage('arousal')
      
      expect(leftImage).toBe('/images/AS_sleepy.png')
      expect(rightImage).toBe('/images/AS_wideawake.png')
    })

    it('should use correct intensity cue image path', () => {
      wrapper = mount(AffectiveSlider, {
        props: { imagePath: '/custom/' }
      })
      
      expect(wrapper.vm.intensityCueImage).toBe('/custom/AS_intensity_cue.png')
    })
  })

  describe('Watchers', () => {
    it('should update internal pleasure value when prop changes', async () => {
      wrapper = mount(AffectiveSlider, {
        props: { pleasureValue: 0.5 }
      })
      
      await wrapper.setProps({ pleasureValue: 0.9 })
      expect(wrapper.vm.pleasure).toBe(0.9)
    })

    it('should update internal arousal value when prop changes', async () => {
      wrapper = mount(AffectiveSlider, {
        props: { arousalValue: 0.5 }
      })
      
      await wrapper.setProps({ arousalValue: 0.2 })
      expect(wrapper.vm.arousal).toBe(0.2)
    })
  })

  describe('Slider Attributes', () => {
    it('should have correct min, max, and step attributes', async () => {
      wrapper = mount(AffectiveSlider)
      await flushPromises()
      const sliders = wrapper.findAll('.as-slider')
      
      sliders.forEach(slider => {
        expect(slider.attributes('min')).toBe('0')
        expect(slider.attributes('max')).toBe('1')
        expect(slider.attributes('step')).toBe('0.01')
      })
    })

    it('should have range input type', async () => {
      wrapper = mount(AffectiveSlider)
      await flushPromises()
      const sliders = wrapper.findAll('.as-slider')
      
      sliders.forEach(slider => {
        expect(slider.attributes('type')).toBe('range')
      })
    })

    it('should have unique IDs for each slider', async () => {
      wrapper = mount(AffectiveSlider)
      await flushPromises()
      const pleasureSlider = wrapper.find('#AS-pleasure')
      const arousalSlider = wrapper.find('#AS-arousal')
      
      expect(pleasureSlider.exists()).toBe(true)
      expect(arousalSlider.exists()).toBe(true)
    })
  })
})
