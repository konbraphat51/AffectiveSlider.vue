# Affective Slider Vue

<img width="823" height="565" alt="image" src="https://github.com/user-attachments/assets/4a963546-c27e-4c4e-9e12-4a71574843be" />


A Vue 3 component implementation of the Affective Slider (AS) for measuring pleasure and arousal in emotion assessment.

**[Live Demo](https://konbraphat51.github.io/AffectiveSliderVueDemo/)** | [npm Package](https://www.npmjs.com/package/@konbraphat51/affectiveslidervue)

## About

The Affective Slider (AS) is a digital scale for the self-assessment of emotion composed of two slider controls that measure:
- **Pleasure** (sad - happy)
- **Arousal** (sleepy - wide awake)

This component is based on the original [Affective Slider](https://github.com/albertobeta/AffectiveSlider) by Alberto Betella and Paul F.M.J. Verschure.

The AS has been empirically validated and presented in the following open access scientific publication:

> Alberto Betella and Paul F.M.J. Verschure, "[The Affective Slider: A Digital Self-Assessment Scale for the Measurement of Human Emotions](http://journals.plos.org/plosone/article?id=10.1371/journal.pone.0148037)", PLoS ONE, vol. 11, p. e0148037, 2016. DOI: 10.1371/journal.pone.0148037

## Installation

```bash
npm install @konbraphat51/affectiveslidervue
```

The CSS is automatically injected when you import the component, so no additional setup is needed!

## Usage

You may like to see [Demo implementation](https://github.com/konbraphat51/AffectiveSliderVueDemo/blob/main/src/App.vue) for live example.

### Basic Usage

```vue
<template>
  <div>
    <AffectiveSlider
      @update:pleasureValue="handlePleasureChange"
      @update:arousalValue="handleArousalChange"
      @change="handleChange"
    />
  </div>
</template>

<script>
import AffectiveSlider from 'affectiveslidervue'

export default {
  components: {
    AffectiveSlider
  },
  methods: {
    handlePleasureChange(value) {
      console.log('Pleasure:', value)
    },
    handleArousalChange(value) {
      console.log('Arousal:', value)
    },
    handleChange(values) {
      console.log('Both values:', values)
    }
  }
}
</script>
```

### With v-model

```vue
<template>
  <AffectiveSlider
    :pleasure-value="pleasure"
    :arousal-value="arousal"
    @update:pleasureValue="pleasure = $event"
    @update:arousalValue="arousal = $event"
  />
</template>

<script>
export default {
  data() {
    return {
      pleasure: 0.5,
      arousal: 0.5
    }
  }
}
</script>
```

### With Labels

```vue
<template>
  <AffectiveSlider
    pleasure-left-label="Sad"
    pleasure-right-label="Happy"
    arousal-left-label="Sleepy"
    arousal-right-label="Awake"
  />
</template>

<script>
import AffectiveSlider from 'affectiveslidervue'

export default {
  components: {
    AffectiveSlider
  }
}
</script>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `pleasureValue` | Number | 0.5 | Initial value for pleasure slider (0-1) |
| `arousalValue` | Number | 0.5 | Initial value for arousal slider (0-1) |
| `randomizeOrder` | Boolean | true | Randomize the order of sliders to prevent bias |
| `imagePath` | String | '/images/' | Base path for slider images |
| `pleasureLeftLabel` | String | '' | Text label below left icon (sad face) of pleasure slider |
| `pleasureRightLabel` | String | '' | Text label below right icon (happy face) of pleasure slider |
| `arousalLeftLabel` | String | '' | Text label below left icon (sleepy face) of arousal slider |
| `arousalRightLabel` | String | '' | Text label below right icon (awake face) of arousal slider |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:pleasureValue` | Number | Emitted when pleasure value changes |
| `update:arousalValue` | Number | Emitted when arousal value changes |
| `change` | { pleasure: Number, arousal: Number } | Emitted when any value changes |
| `interacted` | { type: String, pleasure: Number, arousal: Number } | Emitted on first interaction with each slider |

## License

CC-BY-SA-4.0 - Same as the original Affective Slider

## Credits

Original Affective Slider by Alberto Betella and Paul F.M.J. Verschure

Vue component implementation: This project
