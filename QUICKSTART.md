# Quick Start Guide

Get started with the Affective Slider Vue component in minutes!

## Installation

```bash
npm install affectiveslidervue
```

## Setup Images

Copy the PNG files from the `PNGs` directory to your project's `public/images/` directory:

```
your-project/
  public/
    images/
      AS_happy.png
      AS_unhappy.png
      AS_sleepy.png
      AS_wideawake.png
      AS_intensity_cue.png
```

## Basic Usage

```vue
<template>
  <div>
    <h1>How do you feel?</h1>
    <AffectiveSlider 
      @change="onValuesChange"
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
    onValuesChange(values) {
      console.log('Pleasure:', values.pleasure)
      console.log('Arousal:', values.arousal)
    }
  }
}
</script>
```

## Run the Demo

Want to see it in action first?

```bash
# Clone the repository
git clone https://github.com/konbraphat51/AffectiveSliderVue.git
cd AffectiveSliderVue

# Install dependencies
npm install

# Run the demo
npm run dev
```

Then open http://localhost:5173 in your browser.

## Next Steps

- Check out [EXAMPLES.md](./EXAMPLES.md) for more advanced usage
- Read the full [README.md](./README.md) for API documentation
- Review the [CHANGELOG.md](./CHANGELOG.md) for version history

## Component Props

| Prop | Default | Description |
|------|---------|-------------|
| `pleasureValue` | 0.5 | Initial pleasure value (0-1) |
| `arousalValue` | 0.5 | Initial arousal value (0-1) |
| `randomizeOrder` | true | Randomize slider order |
| `imagePath` | '/images/' | Base path for images |

## Component Events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:pleasureValue` | Number | Pleasure value changed |
| `update:arousalValue` | Number | Arousal value changed |
| `change` | {pleasure, arousal} | Any value changed |
| `interacted` | {type, pleasure, arousal} | First slider interaction |

## Need Help?

- See [EXAMPLES.md](./EXAMPLES.md) for common use cases
- Check the [original Affective Slider paper](http://journals.plos.org/plosone/article?id=10.1371/journal.pone.0148037) for research background
- Visit the [original repository](https://github.com/albertobeta/AffectiveSlider) for design guidelines
