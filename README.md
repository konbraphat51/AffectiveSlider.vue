# Affective Slider Vue

A Vue 3 component implementation of the Affective Slider (AS) for measuring pleasure and arousal in emotion assessment.

## About

The Affective Slider (AS) is a digital scale for the self-assessment of emotion composed of two slider controls that measure:
- **Pleasure** (sad - happy)
- **Arousal** (sleepy - wide awake)

This component is based on the original [Affective Slider](https://github.com/albertobeta/AffectiveSlider) by Alberto Betella and Paul F.M.J. Verschure.

The AS has been empirically validated and presented in the following open access scientific publication:

> Alberto Betella and Paul F.M.J. Verschure, "[The Affective Slider: A Digital Self-Assessment Scale for the Measurement of Human Emotions](http://journals.plos.org/plosone/article?id=10.1371/journal.pone.0148037)", PLoS ONE, vol. 11, p. e0148037, 2016. DOI: 10.1371/journal.pone.0148037

## Features

- ✅ Vue 3 compatible
- ✅ Fully responsive design
- ✅ Randomizable slider order (to prevent bias)
- ✅ Interaction tracking
- ✅ Touch and mouse support
- ✅ Customizable initial values
- ✅ Event emissions for value changes
- ✅ Follows original design guidelines

## Installation

```bash
npm install affectiveslidervue
```

## Usage

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

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `pleasureValue` | Number | 0.5 | Initial value for pleasure slider (0-1) |
| `arousalValue` | Number | 0.5 | Initial value for arousal slider (0-1) |
| `randomizeOrder` | Boolean | true | Randomize the order of sliders to prevent bias |
| `imagePath` | String | '/images/' | Base path for slider images |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:pleasureValue` | Number | Emitted when pleasure value changes |
| `update:arousalValue` | Number | Emitted when arousal value changes |
| `change` | { pleasure: Number, arousal: Number } | Emitted when any value changes |
| `interacted` | { type: String, pleasure: Number, arousal: Number } | Emitted on first interaction with each slider |

## Setup for Images

Make sure to copy the image files from the `PNGs` directory to your `public/images/` directory. The component expects the following images:

- `AS_happy.png`
- `AS_unhappy.png`
- `AS_sleepy.png`
- `AS_wideawake.png`
- `AS_intensity_cue.png`

If your images are in a different location, use the `imagePath` prop to specify the correct path.

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Design Guidelines

This component follows the official design guidelines:

- Both sliders have horizontal orientation
- Sliders are presented simultaneously with thumbs at center (0.5)
- Proper spacing and sizing for easy interaction
- Intensity cue with emoticons at extremities
- Greyscale color palette
- Values range from 0 to 1 with 0.01 resolution
- Thumbs are circular and larger than track
- Order can be randomized to prevent bias
- Visual feedback on interaction

## License

CC-BY-SA-4.0 - Same as the original Affective Slider

## Credits

Original Affective Slider by Alberto Betella and Paul F.M.J. Verschure

Vue component implementation: This project
