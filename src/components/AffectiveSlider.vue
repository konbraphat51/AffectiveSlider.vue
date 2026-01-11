<template>
  <div class="affective-slider">
    <div 
      v-for="slider in orderedSliders" 
      :key="slider.type"
      :class="['as-container', slider.type]"
    >
      <img 
        :src="slider.leftImage" 
        :alt="`${slider.type} left`" 
        class="as-icon as-icon-left"
      />
      <input 
        type="range" 
        :name="`AS-${slider.type}`"
        :id="`AS-${slider.type}`"
        :value="slider.value"
        min="0" 
        max="1" 
        step="0.01"
        @input="handleInput(slider.type, $event)"
        @mousedown="handleInteraction(slider.type)"
        @touchstart="handleInteraction(slider.type)"
        class="as-slider"
      />
      <img 
        :src="slider.rightImage" 
        :alt="`${slider.type} right`" 
        class="as-icon as-icon-right"
      />
      <div class="as-intensity-cue">
        <img :src="intensityCueImage" alt="intensity cue" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AffectiveSlider',
  props: {
    // Initial value for pleasure slider (0-1)
    pleasureValue: {
      type: Number,
      default: 0.5,
      validator: (value) => value >= 0 && value <= 1
    },
    // Initial value for arousal slider (0-1)
    arousalValue: {
      type: Number,
      default: 0.5,
      validator: (value) => value >= 0 && value <= 1
    },
    // Randomize the order of sliders
    randomizeOrder: {
      type: Boolean,
      default: true
    },
    // Base path for images
    imagePath: {
      type: String,
      default: '/images/'
    }
  },
  data() {
    return {
      pleasure: this.pleasureValue,
      arousal: this.arousalValue,
      sliderOrder: [],
      interacted: {
        pleasure: false,
        arousal: false
      }
    }
  },
  computed: {
    orderedSliders() {
      return this.sliderOrder.map(type => ({
        type,
        value: this[type],
        leftImage: this.getLeftImage(type),
        rightImage: this.getRightImage(type)
      }))
    },
    intensityCueImage() {
      return `${this.imagePath}AS_intensity_cue.png`
    }
  },
  methods: {
    handleInput(type, event) {
      const value = parseFloat(event.target.value)
      this[type] = value
      this.$emit(`update:${type}Value`, value)
      this.$emit('change', { pleasure: this.pleasure, arousal: this.arousal })
    },
    handleInteraction(type) {
      if (!this.interacted[type]) {
        this.interacted[type] = true
        this.$emit('interacted', { type, pleasure: this.pleasure, arousal: this.arousal })
      }
    },
    getLeftImage(type) {
      return type === 'pleasure' 
        ? `${this.imagePath}AS_unhappy.png`
        : `${this.imagePath}AS_sleepy.png`
    },
    getRightImage(type) {
      return type === 'pleasure'
        ? `${this.imagePath}AS_happy.png`
        : `${this.imagePath}AS_wideawake.png`
    },
    initializeSliderOrder() {
      const sliders = ['arousal', 'pleasure']
      if (this.randomizeOrder && Math.random() > 0.5) {
        this.sliderOrder = [...sliders]
      } else {
        this.sliderOrder = [...sliders].reverse()
      }
    }
  },
  mounted() {
    this.initializeSliderOrder()
  },
  watch: {
    pleasureValue(newVal) {
      this.pleasure = newVal
    },
    arousalValue(newVal) {
      this.arousal = newVal
    }
  }
}
</script>

<style scoped>
.affective-slider {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.as-container {
  margin: 3em 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;
}

.as-icon {
  width: 60px;
  height: 60px;
  object-fit: contain;
}

.as-icon-left,
.as-icon-right {
  position: absolute;
  top: 0;
}

.as-icon-left {
  left: 0;
}

.as-icon-right {
  right: 0;
}

.as-slider {
  -webkit-appearance: none;
  width: calc(100% - 140px);
  height: 20px;
  background: #ddd;
  border-radius: 10px;
  outline: none;
  margin: 0 70px;
  cursor: pointer;
}

.as-slider:focus {
  background: #ccc;
}

/* Webkit (Chrome, Safari, Edge) */
.as-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background: white;
  border: 2px solid #505050;
  cursor: pointer;
  transition: all 0.2s ease;
}

.as-slider::-webkit-slider-thumb:hover {
  background: #505050;
  border: 2px solid white;
  box-shadow: 0px 0px 12px #212121;
}

.as-slider::-webkit-slider-thumb:active {
  background: #505050;
  border: 2px solid white;
}

/* Firefox */
.as-slider::-moz-range-thumb {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background: white;
  border: 2px solid #505050;
  cursor: pointer;
  transition: all 0.2s ease;
}

.as-slider::-moz-range-thumb:hover {
  background: #505050;
  border: 2px solid white;
  box-shadow: 0px 0px 12px #212121;
}

.as-slider::-moz-range-thumb:active {
  background: #505050;
  border: 2px solid white;
}

.as-slider::-moz-range-track {
  width: 100%;
  height: 20px;
  background: #ddd;
  border-radius: 10px;
  border: none;
}

.as-slider:focus::-moz-range-track {
  background: #ccc;
}

/* IE/Edge */
.as-slider::-ms-track {
  width: 100%;
  height: 20px;
  background: transparent;
  border-color: transparent;
  border-width: 16px 0;
  color: transparent;
}

.as-slider::-ms-fill-lower {
  background: #ddd;
  border-radius: 10px;
}

.as-slider::-ms-fill-upper {
  background: #ddd;
  border-radius: 10px;
}

.as-slider::-ms-thumb {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background: white;
  border: 2px solid #505050;
  cursor: pointer;
}

.as-slider::-ms-thumb:hover {
  background: #505050;
  border: 2px solid white;
  box-shadow: 0px 0px 12px #212121;
}

.as-slider::-ms-thumb:active {
  background: #505050;
  border: 2px solid white;
}

.as-slider:focus::-ms-fill-lower {
  background: #ccc;
}

.as-slider:focus::-ms-fill-upper {
  background: #ccc;
}

.as-intensity-cue {
  width: calc(100% - 140px);
  margin: 10px 70px 0;
}

.as-intensity-cue img {
  width: 100%;
  height: auto;
}

/* Responsive design */
@media (max-width: 768px) {
  .as-icon {
    width: 40px;
    height: 40px;
  }
  
  .as-slider {
    width: calc(100% - 100px);
    margin: 0 50px;
  }
  
  .as-intensity-cue {
    width: calc(100% - 100px);
    margin: 10px 50px 0;
  }
}
</style>
