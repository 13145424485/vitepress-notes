<template>
  <div ref="lottieContainer" class="lottie-background"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const lottieContainer = ref(null)
let animation = null

onMounted(async () => {
  console.log('LottieBackground component mounted')
  try {
    // 动态加载lottie-web库
    if (!window.lottie) {
      console.log('Loading lottie-web library...')
      const script = document.createElement('script')
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.12.2/lottie.min.js'
      document.head.appendChild(script)

      await new Promise((resolve) => {
        script.onload = resolve
      })
      console.log('Lottie-web library loaded')
    }

    // 加载动画数据
    console.log('Loading background animation data...')
    const response = await fetch('/工作.json')
    const animationData = await response.json()
    console.log('Background animation data loaded:', animationData)

    // 初始化Lottie动画
    console.log('Initializing Lottie background animation...')
    animation = window.lottie.loadAnimation({
      container: lottieContainer.value,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: animationData
    })
    console.log('Lottie background animation initialized successfully')
  } catch (error) {
    console.error('Failed to load Lottie background animation:', error)
  }
})

onUnmounted(() => {
  if (animation) {
    animation.destroy()
  }
})
</script>

<style scoped>
.lottie-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  opacity: 0.15;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.lottie-background svg {
  width: 100%;
  height: 100%;
  max-width: 1000px;
  max-height: 1000px;
  object-fit: contain;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .lottie-background {
    opacity: 0.1;
  }
  .lottie-background svg {
    width: 120%;
    height: 120%;
  }
}

@media (max-width: 480px) {
  .lottie-background {
    opacity: 0.08;
  }
  .lottie-background svg {
    width: 140%;
    height: 140%;
  }
}
</style>
