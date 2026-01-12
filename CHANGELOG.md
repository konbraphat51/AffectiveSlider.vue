# Changelog

## [1.0.0] - 2026-01-11

### Added
- Initial Vue 3 component implementation of the Affective Slider
- Two range sliders for measuring pleasure (sad-happy) and arousal (sleepy-wide awake)
- Randomizable slider order to prevent response bias
- Interaction tracking for research purposes
- Responsive design with touch and mouse support
- Event emissions for value changes (`update:pleasureValue`, `update:arousalValue`, `change`, `interacted`)
- Customizable image paths via props
- Comprehensive README with installation and usage instructions
- Extensive usage examples covering common scenarios
- Demo application showcasing the component
- Support for both Options API and Composition API
- Full compliance with official Affective Slider design guidelines

### Technical Details
- Built with Vue 3 and Vite
- Supports both ES modules and UMD builds
- Greyscale color palette following original design
- Values range from 0 to 1 with 0.01 resolution
- Visual feedback on slider interaction
- TypeScript-friendly API

### License
CC-BY-SA-4.0 (same as original Affective Slider)
