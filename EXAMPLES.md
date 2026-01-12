# Usage Examples

## Basic Installation and Setup

### 1. Install the package

```bash
pnpm add affectiveslidervue
```

### 2. Setup images

The images are included in the npm package. Copy them to your public directory.

**Using a postinstall script (cross-platform):**

```bash
# Install cross-platform copy utility
pnpm add -D cpx2
```

Add to your `package.json`:

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
cp -r node_modules/affectiveslidervue/dist/images public/

# Windows (PowerShell)
Copy-Item -Path "node_modules/affectiveslidervue/dist/images/*" -Destination "public/images/" -Recurse

# Windows (Command Prompt)
xcopy /E /I node_modules\affectiveslidervue\dist\images public\images
```

Your project structure:

```
public/
  images/
    AS_happy.png
    AS_unhappy.png
    AS_sleepy.png
    AS_wideawake.png
    AS_intensity_cue.png
```

### 3. Import and use the component

```vue
<template>
  <div>
    <AffectiveSlider />
  </div>
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

## Advanced Examples

### Example 1: Tracking Values

```vue
<template>
  <div>
    <AffectiveSlider
      :pleasure-value="pleasure"
      :arousal-value="arousal"
      @update:pleasureValue="pleasure = $event"
      @update:arousalValue="arousal = $event"
      @change="onValuesChange"
    />
    
    <p>Pleasure: {{ pleasure }}</p>
    <p>Arousal: {{ arousal }}</p>
  </div>
</template>

<script>
import AffectiveSlider from 'affectiveslidervue'

export default {
  components: {
    AffectiveSlider
  },
  data() {
    return {
      pleasure: 0.5,
      arousal: 0.5
    }
  },
  methods: {
    onValuesChange(values) {
      console.log('New values:', values)
      // Send to your backend, etc.
    }
  }
}
</script>
```

### Example 2: Tracking User Interaction

Detect when users first interact with each slider (useful for research):

```vue
<template>
  <div>
    <AffectiveSlider
      @interacted="onFirstInteraction"
    />
    
    <div v-if="interactionLog.length > 0">
      <h3>Interaction Log:</h3>
      <ul>
        <li v-for="(log, index) in interactionLog" :key="index">
          {{ log }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import AffectiveSlider from 'affectiveslidervue'

export default {
  components: {
    AffectiveSlider
  },
  data() {
    return {
      interactionLog: []
    }
  },
  methods: {
    onFirstInteraction(data) {
      const timestamp = new Date().toISOString()
      this.interactionLog.push(
        `${timestamp}: User interacted with ${data.type} slider (P: ${data.pleasure}, A: ${data.arousal})`
      )
    }
  }
}
</script>
```

### Example 3: Custom Image Path

If your images are in a different location:

```vue
<template>
  <AffectiveSlider
    image-path="/assets/affective-slider/"
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

### Example 4: Setting Initial Values

```vue
<template>
  <AffectiveSlider
    :pleasure-value="0.7"
    :arousal-value="0.3"
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

### Example 5: Disable Random Order

By default, the slider order is randomized to prevent bias. To disable this:

```vue
<template>
  <AffectiveSlider
    :randomize-order="false"
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

### Example 6: Survey/Questionnaire Integration

```vue
<template>
  <form @submit.prevent="submitSurvey">
    <h2>How do you feel right now?</h2>
    
    <AffectiveSlider
      :pleasure-value="feelings.pleasure"
      :arousal-value="feelings.arousal"
      @update:pleasureValue="feelings.pleasure = $event"
      @update:arousalValue="feelings.arousal = $event"
      @interacted="trackInteraction"
    />
    
    <button type="submit" :disabled="!hasInteracted">
      Submit
    </button>
    
    <p v-if="!hasInteracted" class="warning">
      Please interact with both sliders before submitting
    </p>
  </form>
</template>

<script>
import AffectiveSlider from 'affectiveslidervue'

export default {
  components: {
    AffectiveSlider
  },
  data() {
    return {
      feelings: {
        pleasure: 0.5,
        arousal: 0.5
      },
      interacted: {
        pleasure: false,
        arousal: false
      }
    }
  },
  computed: {
    hasInteracted() {
      return this.interacted.pleasure && this.interacted.arousal
    }
  },
  methods: {
    trackInteraction(data) {
      this.interacted[data.type] = true
    },
    async submitSurvey() {
      // Submit to your backend
      const response = await fetch('/api/survey', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.feelings)
      })
      // Handle response...
    }
  }
}
</script>

<style scoped>
.warning {
  color: #ff6b6b;
  font-style: italic;
}
</style>
```

## TypeScript Support

If you're using TypeScript, you can type the event payloads:

```typescript
import AffectiveSlider from 'affectiveslidervue'

interface AffectiveValues {
  pleasure: number
  arousal: number
}

interface InteractionData {
  type: 'pleasure' | 'arousal'
  pleasure: number
  arousal: number
}

export default {
  components: {
    AffectiveSlider
  },
  methods: {
    onValuesChange(values: AffectiveValues) {
      console.log(values)
    },
    onInteraction(data: InteractionData) {
      console.log(data)
    }
  }
}
```

## Composition API Example

For Vue 3 Composition API users:

```vue
<template>
  <AffectiveSlider
    :pleasure-value="pleasure"
    :arousal-value="arousal"
    @update:pleasureValue="pleasure = $event"
    @update:arousalValue="arousal = $event"
    @change="handleChange"
  />
</template>

<script setup>
import { ref } from 'vue'
import AffectiveSlider from 'affectiveslidervue'

const pleasure = ref(0.5)
const arousal = ref(0.5)

const handleChange = (values) => {
  console.log('Values changed:', values)
}
</script>
```
