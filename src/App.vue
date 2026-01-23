<template>
  <div id="demo-app">
    <h1>Affective Slider Vue Component</h1>
    <p class="description">
      The Affective Slider (AS) is a digital scale for self-assessment of emotion
      composed of two slider controls that measure pleasure (sad - happy) and
      arousal (sleepy - wide awake).
    </p>

    <AffectiveSlider
      :pleasure-value="pleasure"
      :arousal-value="arousal"
      pleasure-left-label="Sad"
      pleasure-right-label="Happy"
      arousal-left-label="Sleepy"
      arousal-right-label="Awake"
      @update:pleasureValue="pleasure = $event"
      @update:arousalValue="arousal = $event"
      @change="handleChange"
      @interacted="handleInteraction"
    />

    <div class="values-display">
      <h3>Current Values:</h3>
      <div class="value-item">
        <span class="value-label">Pleasure:</span>
        <span class="value-number">{{ pleasure.toFixed(2) }}</span>
      </div>
      <div class="value-item">
        <span class="value-label">Arousal:</span>
        <span class="value-number">{{ arousal.toFixed(2) }}</span>
      </div>

      <div v-if="lastInteraction" class="interacted-status">
        <strong>Last interaction:</strong> {{ lastInteraction }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AffectiveSlider from '@konbraphat51/affectiveslidervue'

const pleasure = ref(0.5)
const arousal = ref(0.5)
const lastInteraction = ref(null)

const handleChange = (values) => {
  console.log('Values changed:', values)
}

const handleInteraction = (data) => {
  lastInteraction.value = `User interacted with ${data.type} slider`
  console.log('Interaction:', data)
}
</script>

<style scoped>
#demo-app {
  max-width: 900px;
  margin: 0 auto;
  background: white;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

h1 {
  color: #333;
  margin-top: 0;
}

.description {
  color: #666;
  line-height: 1.6;
  margin-bottom: 30px;
}

.values-display {
  margin-top: 30px;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 4px;
}

.value-item {
  margin: 10px 0;
  font-family: monospace;
}

.value-label {
  font-weight: bold;
  color: #333;
}

.value-number {
  color: #0066cc;
}

.interacted-status {
  margin-top: 20px;
  padding: 15px;
  background: #e8f4f8;
  border-left: 4px solid #0066cc;
  border-radius: 4px;
}
</style>
