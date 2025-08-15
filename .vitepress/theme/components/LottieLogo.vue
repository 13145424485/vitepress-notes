<template>
  <div ref="lottieContainer" class="lottie-logo"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const lottieContainer = ref(null)
let animation = null

onMounted(async () => {
  console.log('LottieLogo component mounted')
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
    console.log('Loading animation data...')
    const response = await fetch('/工作.json')
    const animationData = await response.json()
    console.log('Animation data loaded:', animationData)

    // 初始化Lottie动画
    console.log('Initializing Lottie animation...')
    animation = window.lottie.loadAnimation({
      container: lottieContainer.value,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: animationData
    })
    console.log('Lottie animation initialized successfully')
  } catch (error) {
    console.error('Failed to load Lottie animation:', error)
    // 如果加载失败，显示文字作为后备
    if (lottieContainer.value) {
      lottieContainer.value.innerHTML = '<span style="font-size: 14px; color: #3c4043;">记忆中</span>'
    }
  }
})

onUnmounted(() => {
  if (animation) {
    animation.destroy()
  }
})
</script>

<style scoped>
.lottie-logo {
  width: 32px;
  height: 32px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
</style>
