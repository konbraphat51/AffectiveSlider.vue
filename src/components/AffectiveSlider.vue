<template>
  <div class="affective-slider">
    <div
      v-for="slider in orderedSliders"
      :key="slider.type"
      :class="['as-container', slider.type]"
    >
      <div class="as-icon-wrapper as-icon-left">
        <img
          :src="slider.leftImage"
          :alt="`${slider.type} left`"
          class="as-icon"
        />
        <div v-if="slider.leftLabel" class="as-icon-label">{{ slider.leftLabel }}</div>
      </div>
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
      <div class="as-icon-wrapper as-icon-right">
        <img
          :src="slider.rightImage"
          :alt="`${slider.type} right`"
          class="as-icon"
        />
        <div v-if="slider.rightLabel" class="as-icon-label">{{ slider.rightLabel }}</div>
      </div>
      <div class="as-intensity-cue">
        <img :src="intensityCueImage" alt="intensity cue" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import unhappyImage from '../assets/images/AS_unhappy.png'
import sleepyImage from '../assets/images/AS_sleepy.png'
import happyImage from '../assets/images/AS_happy.png'
import wideawakeImage from '../assets/images/AS_wideawake.png'
import intensityCueImage from '../assets/images/AS_intensity_cue.png'

const props = defineProps({
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
  // Label below left icon for pleasure slider (unhappy face)
  pleasureLeftLabel: {
    type: String,
    default: ''
  },
  // Label below right icon for pleasure slider (happy face)
  pleasureRightLabel: {
    type: String,
    default: ''
  },
  // Label below left icon for arousal slider (sleepy face)
  arousalLeftLabel: {
    type: String,
    default: ''
  },
  // Label below right icon for arousal slider (wide awake face)
  arousalRightLabel: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:pleasureValue', 'update:arousalValue', 'change', 'interacted'])

const pleasure = ref(props.pleasureValue)
const arousal = ref(props.arousalValue)
const sliderOrder = ref([])
const interacted = ref({
  pleasure: false,
  arousal: false
})

const getLeftImage = (type) => {
  return type === 'pleasure' ? unhappyImage : sleepyImage
}

const getRightImage = (type) => {
  return type === 'pleasure' ? happyImage : wideawakeImage
}

const getLeftLabel = (type) => {
  return type === 'pleasure' ? props.pleasureLeftLabel : props.arousalLeftLabel
}

const getRightLabel = (type) => {
  return type === 'pleasure' ? props.pleasureRightLabel : props.arousalRightLabel
}

const orderedSliders = computed(() => {
  return sliderOrder.value.map(type => ({
    type,
    value: type === 'pleasure' ? pleasure.value : arousal.value,
    leftImage: getLeftImage(type),
    rightImage: getRightImage(type),
    leftLabel: getLeftLabel(type),
    rightLabel: getRightLabel(type)
  }))
})

const handleInput = (type, event) => {
  const value = parseFloat(event.target.value)
  if (type === 'pleasure') {
    pleasure.value = value
  } else {
    arousal.value = value
  }
  emit(`update:${type}Value`, value)
  emit('change', { pleasure: pleasure.value, arousal: arousal.value })
}

const handleInteraction = (type) => {
  if (!interacted.value[type]) {
    interacted.value[type] = true
    emit('interacted', { type, pleasure: pleasure.value, arousal: arousal.value })
  }
}

const initializeSliderOrder = () => {
  const sliders = ['arousal', 'pleasure']
  if (props.randomizeOrder) {
    sliderOrder.value = Math.random() > 0.5 ? [...sliders] : [...sliders].reverse()
  } else {
    sliderOrder.value = ['pleasure', 'arousal']
  }
}

onMounted(() => {
  initializeSliderOrder()
})

watch(() => props.pleasureValue, (newVal) => {
  pleasure.value = newVal
})

watch(() => props.arousalValue, (newVal) => {
  arousal.value = newVal
})
</script>

<style>
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

.as-icon-wrapper {
  position: absolute;
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.as-icon-left {
  left: 0;
}

.as-icon-right {
  right: 0;
}

.as-icon-label {
  font-size: 12px;
  color: #333;
  text-align: center;
  white-space: nowrap;
  max-width: 80px;
  overflow: hidden;
  text-overflow: ellipsis;
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
  
  .as-icon-label {
    font-size: 10px;
    max-width: 60px;
  }
}
</style>
