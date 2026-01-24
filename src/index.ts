import AffectiveSlider from './components/AffectiveSlider.vue'

// Auto-inject CSS styles when the component is imported
if (typeof document !== 'undefined') {
  const styleId = 'affectiveslidervue-styles'
  
  // Check if styles are already injected
  if (!document.getElementById(styleId)) {
    const style = document.createElement('style')
    style.id = styleId
    style.textContent = `
.affective-slider{width:100%;max-width:800px;margin:0 auto;padding:20px}.as-container{margin:3em 0;display:flex;align-items:center;justify-content:center;flex-direction:column;position:relative}.as-icon{width:60px;height:60px;object-fit:contain}.as-icon-wrapper{position:absolute;top:0;display:flex;flex-direction:column;align-items:center;gap:4px}.as-icon-left{left:0}.as-icon-right{right:0}.as-icon-label{font-size:12px;color:#333;text-align:center;white-space:nowrap;max-width:80px;overflow:hidden;text-overflow:ellipsis}.as-slider{-webkit-appearance:none;width:calc(100% - 140px);height:20px;background:#ddd;border-radius:10px;outline:none;margin:0 70px;cursor:pointer}.as-slider:focus{background:#ccc}.as-slider::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;width:35px;height:35px;border-radius:50%;background:#fff;border:2px solid #505050;cursor:pointer;transition:all .2s ease}.as-slider::-webkit-slider-thumb:hover{background:#505050;border:2px solid #fff;box-shadow:0 0 12px #212121}.as-slider::-webkit-slider-thumb:active{background:#505050;border:2px solid #fff}.as-slider::-moz-range-thumb{width:35px;height:35px;border-radius:50%;background:#fff;border:2px solid #505050;cursor:pointer;transition:all .2s ease}.as-slider::-moz-range-thumb:hover{background:#505050;border:2px solid #fff;box-shadow:0 0 12px #212121}.as-slider::-moz-range-thumb:active{background:#505050;border:2px solid #fff}.as-slider::-moz-range-track{width:100%;height:20px;background:#ddd;border-radius:10px;border:none}.as-slider:focus::-moz-range-track{background:#ccc}.as-slider::-ms-track{width:100%;height:20px;background:transparent;border-color:transparent;border-width:16px 0;color:transparent}.as-slider::-ms-fill-lower{background:#ddd;border-radius:10px}.as-slider::-ms-fill-upper{background:#ddd;border-radius:10px}.as-slider::-ms-thumb{width:35px;height:35px;border-radius:50%;background:#fff;border:2px solid #505050;cursor:pointer}.as-slider::-ms-thumb:hover{background:#505050;border:2px solid #fff;box-shadow:0 0 12px #212121}.as-slider::-ms-thumb:active{background:#505050;border:2px solid #fff}.as-slider:focus::-ms-fill-lower{background:#ccc}.as-slider:focus::-ms-fill-upper{background:#ccc}.as-intensity-cue{width:calc(100% - 140px);margin:10px 70px 0}.as-intensity-cue img{width:100%;height:auto}@media(max-width:768px){.as-icon{width:40px;height:40px}.as-slider{width:calc(100% - 100px);margin:0 50px}.as-intensity-cue{width:calc(100% - 100px);margin:10px 50px 0}.as-icon-label{font-size:10px;max-width:60px}}
    `
    document.head.appendChild(style)
  }
}

export { AffectiveSlider }
export default AffectiveSlider
