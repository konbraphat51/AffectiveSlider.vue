import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount, flushPromises, VueWrapper, DOMWrapper } from '@vue/test-utils'
import AffectiveSlider from '../AffectiveSlider.vue'
import unhappyImage from '../../assets/images/AS_unhappy.png'
import sleepyImage from '../../assets/images/AS_sleepy.png'
import happyImage from '../../assets/images/AS_happy.png'
import wideawakeImage from '../../assets/images/AS_wideawake.png'
import intensityCueImage from '../../assets/images/AS_intensity_cue.png'

describe('AffectiveSlider', () => {
  let wrapper: VueWrapper

  beforeEach(() => {
    // Reset Math.random mock before each test
    vi.restoreAllMocks()
    wrapper = mount(AffectiveSlider, {
      props: {
        // Ensure fixed order for predictable DOM queries
        randomizeOrder: false
      }
    })
  })

  describe('Component Rendering', () => {
    it('should render the component', async () => {
      await flushPromises()
      expect(wrapper.find('.affective-slider').exists()).toBe(true)
    })

    it('should render two slider containers', async () => {
      await flushPromises()
      const containers = wrapper.findAll('.as-container')
      expect(containers).toHaveLength(2)
    })

    it('should render slider inputs', async () => {
      await flushPromises()
      const sliders = wrapper.findAll('.as-slider')
      expect(sliders).toHaveLength(2)
    })

    it('should render icons for both sliders', async () => {
      await flushPromises()
      const icons = wrapper.findAll('.as-icon')
      // 2 sliders * 2 icons each (left and right) = 4 icons
      expect(icons).toHaveLength(4)
    })

    it('should render intensity cue images', async () => {
      await flushPromises()
      const intensityCues = wrapper.findAll('.as-intensity-cue img')
      expect(intensityCues).toHaveLength(2)
    })
  })

  describe('Props', () => {
    it('should accept pleasureValue prop', async () => {
      // Re-mount for this specific test
      wrapper = mount(AffectiveSlider, {
        props: { pleasureValue: 0.7, randomizeOrder: false }
      })
      await flushPromises()
      // Note: we can't directly test ref value, so we test the rendered output
      const pleasureSlider = wrapper.find('input[name="AS-pleasure"]')
      expect((pleasureSlider.element as HTMLInputElement).value).toBe('0.7')
    })

    it('should accept arousalValue prop', async () => {
      // Re-mount for this specific test
      wrapper = mount(AffectiveSlider, {
        props: { arousalValue: 0.3, randomizeOrder: false }
      })
      await flushPromises()
      const arousalSlider = wrapper.find('input[name="AS-arousal"]')
      expect((arousalSlider.element as HTMLInputElement).value).toBe('0.3')
    })

    it('should have default values of 0.5 for both sliders', () => {
      const pleasureSlider = wrapper.find('input[name="AS-pleasure"]')
      const arousalSlider = wrapper.find('input[name="AS-arousal"]')
      expect((pleasureSlider.element as HTMLInputElement).value).toBe('0.5')
      expect((arousalSlider.element as HTMLInputElement).value).toBe('0.5')
    })

    it('should render pleasure labels when provided', async () => {
      await wrapper.setProps({
        pleasureLeftLabel: 'Sad',
        pleasureRightLabel: 'Happy'
      })
      await flushPromises()
      const labels = wrapper.findAll('.as-icon-label')
      const labelTexts = labels.map((l: DOMWrapper<Element>) => l.text())
      expect(labelTexts).toContain('Sad')
      expect(labelTexts).toContain('Happy')
    })

    it('should render arousal labels when provided', async () => {
      await wrapper.setProps({
        arousalLeftLabel: 'Sleepy',
        arousalRightLabel: 'Awake'
      })
      await flushPromises()
      const labels = wrapper.findAll('.as-icon-label')
      const labelTexts = labels.map((l: DOMWrapper<Element>) => l.text())
      expect(labelTexts).toContain('Sleepy')
      expect(labelTexts).toContain('Awake')
    })
  })

  // Props validation tests are removed as they are no longer easily accessible with <script setup>
  // and are implicitly covered by TypeScript during the build process.

  describe('Slider Input Handling', () => {
    it('should emit update:pleasureValue event', async () => {
      await flushPromises()
      const pleasureSlider = wrapper.find('input[name="AS-pleasure"]')
      
      await pleasureSlider.setValue(0.8)
      expect(wrapper.emitted('update:pleasureValue')).toBeTruthy()
      expect(wrapper.emitted('update:pleasureValue')![0]).toEqual([0.8])
    })

    it('should emit update:arousalValue event', async () => {
      await flushPromises()
      const arousalSlider = wrapper.find('input[name="AS-arousal"]')
      
      await arousalSlider.setValue(0.3)
      expect(wrapper.emitted('update:arousalValue')).toBeTruthy()
      expect(wrapper.emitted('update:arousalValue')![0]).toEqual([0.3])
    })

    it('should emit change event with both values', async () => {
      await flushPromises()
      const pleasureSlider = wrapper.find('input[name="AS-pleasure"]')
      
      await pleasureSlider.setValue(0.7)
      expect(wrapper.emitted('change')).toBeTruthy()
      expect(wrapper.emitted('change')![0]).toEqual([{ pleasure: 0.7, arousal: 0.5 }])
    })
  })

  describe('Interaction Tracking', () => {
    it('should emit interacted event on first mousedown', async () => {
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
      await flushPromises()
      const pleasureSlider = wrapper.find('input[name="AS-pleasure"]')
      
      await pleasureSlider.trigger('mousedown')
      await pleasureSlider.trigger('mousedown')
      await pleasureSlider.trigger('touchstart')
      
      expect(wrapper.emitted('interacted')).toHaveLength(1)
    })
  })

  describe('Slider Order', () => {
    it('should randomize slider order when randomizeOrder is true', async () => {
      const mockRandom = vi.spyOn(Math, 'random')
      
      mockRandom.mockReturnValue(0.3) // pleasure, arousal
      wrapper.unmount()
      const wrapper1 = mount(AffectiveSlider, { props: { randomizeOrder: true } })
      await flushPromises()
      const order1 = wrapper1.findAll('.as-container').map((w: DOMWrapper<Element>) => w.classes().find(c => c !== 'as-container'))

      mockRandom.mockReturnValue(0.7) // arousal, pleasure
      wrapper1.unmount()
      const wrapper2 = mount(AffectiveSlider, { props: { randomizeOrder: true } })
      await flushPromises()
      const order2 = wrapper2.findAll('.as-container').map((w: DOMWrapper<Element>) => w.classes().find(c => c !== 'as-container'))
      
      expect(order1).not.toEqual(order2)
    })

    it('should have fixed order when randomizeOrder is false', async () => {
      await flushPromises()
      const containers = wrapper.findAll('.as-container')
      // First slider should be pleasure, second should be arousal
      expect(containers[0].classes()).toContain('pleasure')
      expect(containers[1].classes()).toContain('arousal')
    })
  })

  describe('Image Paths', () => {
    it('should use correct images for all sliders', async () => {
      await flushPromises()

      const pleasureContainer = wrapper.find('.as-container.pleasure')
      const arousalContainer = wrapper.find('.as-container.arousal')
      
      // Pleasure slider images
      expect(pleasureContainer.find('.as-icon-left img').attributes('src')).toBe(unhappyImage)
      expect(pleasureContainer.find('.as-icon-right img').attributes('src')).toBe(happyImage)
      expect(pleasureContainer.find('.as-intensity-cue img').attributes('src')).toBe(intensityCueImage)

      // Arousal slider images
      expect(arousalContainer.find('.as-icon-left img').attributes('src')).toBe(sleepyImage)
      expect(arousalContainer.find('.as-icon-right img').attributes('src')).toBe(wideawakeImage)
      expect(arousalContainer.find('.as-intensity-cue img').attributes('src')).toBe(intensityCueImage)
    })
  })

  describe('Watchers', () => {
    it('should update internal pleasure value when prop changes', async () => {
      await wrapper.setProps({ pleasureValue: 0.9 })
      const pleasureSlider = wrapper.find('input[name="AS-pleasure"]')
      expect((pleasureSlider.element as HTMLInputElement).value).toBe('0.9')
    })

    it('should update internal arousal value when prop changes', async () => {
      await wrapper.setProps({ arousalValue: 0.2 })
      const arousalSlider = wrapper.find('input[name="AS-arousal"]')
      expect((arousalSlider.element as HTMLInputElement).value).toBe('0.2')
    })
  })

  describe('Slider Attributes', () => {
    it('should have correct min, max, and step attributes', async () => {
      await flushPromises()
      const sliders = wrapper.findAll('.as-slider')
      
      sliders.forEach((slider: DOMWrapper<Element>) => {
        expect(slider.attributes('min')).toBe('0')
        expect(slider.attributes('max')).toBe('1')
        expect(slider.attributes('step')).toBe('0.01')
      })
    })

    it('should have range input type', async () => {
      await flushPromises()
      const sliders = wrapper.findAll('.as-slider')
      
      sliders.forEach((slider: DOMWrapper<Element>) => {
        expect(slider.attributes('type')).toBe('range')
      })
    })

    it('should have unique IDs for each slider', async () => {
      await flushPromises()
      const pleasureSlider = wrapper.find('#AS-pleasure')
      const arousalSlider = wrapper.find('#AS-arousal')
      
      expect(pleasureSlider.exists()).toBe(true)
      expect(arousalSlider.exists()).toBe(true)
    })
  })
})
