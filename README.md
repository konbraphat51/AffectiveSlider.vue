# Affective Slider Vue

A Vue 3 component implementation of the Affective Slider (AS) for measuring pleasure and arousal in emotion assessment.

**[Live Demo](https://konbraphat51.github.io/AffectiveSliderVue/)** | [npm Package](https://www.npmjs.com/package/affectiveslidervue)

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
pnpm add affectiveslidervue
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

## Setup for Images

### Option 1: Using Images from npm Package (Recommended)

When you install the package via npm, the required images are automatically included in `node_modules/affectiveslidervue/dist/images/`. 

To make them accessible to your application, you have two options:

**A. Copy images to your public directory (recommended for most cases)**

Install a cross-platform copy utility and add a postinstall script to your `package.json`:

```bash
# Install cross-platform copy utility
npm install --save-dev cpx2
```

```json
{
  "scripts": {
    "postinstall": "cpx \"node_modules/affectiveslidervue/dist/images/*\" public/images"
  }
}
```

**Or copy manually:**

```bash
# Unix/Mac/Linux
cp -r node_modules/affectiveslidervue/dist/images/* public/images/

# Windows (PowerShell)
Copy-Item -Path "node_modules/affectiveslidervue/dist/images/*" -Destination "public/images/" -Recurse

# Windows (Command Prompt)
xcopy /E /I node_modules\affectiveslidervue\dist\images public\images
```

**B. Use a custom imagePath**

If you're using a bundler like Vite or Webpack, you can configure it to serve images from node_modules:

```vue
<AffectiveSlider
  image-path="/node_modules/affectiveslidervue/dist/images/"
/>
```

### Option 2: Manual Download

Download the image files from the [PNGs directory](https://github.com/konbraphat51/AffectiveSliderVue/tree/main/PNGs) and place them in your `public/images/` directory.

Required images:
- `AS_happy.png`
- `AS_unhappy.png`
- `AS_sleepy.png`
- `AS_wideawake.png`
- `AS_intensity_cue.png`

### Custom Image Location

If your images are in a different location, use the `imagePath` prop:

```vue
<AffectiveSlider
  image-path="/assets/affective-slider/"
/>
```

## Development

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build component for production (library)
pnpm build

# Build demo for GitHub Pages
pnpm run build:demo
```

### GitHub Pages Demo


The `/docs` folder contains a built version of the demo application for GitHub Pages deployment.

**Live Demo**: https://konbraphat51.github.io/AffectiveSliderVue/

To rebuild the demo:
```bash
pnpm run build:demo
```

To publish on GitHub Pages:

1. Push the repository to GitHub.
2. Go to the repository Settings → Pages.
3. Under "Build and deployment" choose "Branch: main" and folder `/docs`.
4. Save — the site will be published from the `docs/` folder.

Note: The demo build uses a relative base (`base: './'`) so assets work correctly when served from `/docs`.

## Publishing

For maintainers: See [PUBLISHING.md](./PUBLISHING.md) for instructions on publishing this package to npm.

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
