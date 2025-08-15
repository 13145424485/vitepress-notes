<template>
  <div ref="lottieContainer" class="lottie-hero"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const lottieContainer = ref(null)
let animation = null

onMounted(async () => {
  console.log('LottieHero component mounted')
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
    console.log('Loading hero animation data...')
    // 使用import.meta.env.BASE_URL来获取正确的base路径
    const baseUrl = import.meta.env.BASE_URL || '/'
    const response = await fetch(`${baseUrl}工作.json`)
    const animationData = await response.json()
    console.log('Hero animation data loaded:', animationData)

    // 初始化Lottie动画
    console.log('Initializing Lottie hero animation...')
    animation = window.lottie.loadAnimation({
      container: lottieContainer.value,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: animationData
    })
    console.log('Lottie hero animation initialized successfully')
  } catch (error) {
    console.error('Failed to load Lottie hero animation:', error)
    // 如果加载失败，显示默认图片或文字
    if (lottieContainer.value) {
      lottieContainer.value.innerHTML = '<div class="fallback-hero">🎯</div>'
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
.lottie-hero {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 320px;
  max-height: 320px;
}

.lottie-hero svg {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.fallback-hero {
  font-size: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: var(--vp-c-brand-1);
}

@media (min-width: 640px) {
  .lottie-hero {
    max-width: 392px;
    max-height: 392px;
  }
}

@media (min-width: 960px) {
  .lottie-hero {
    max-width: 100%;
    max-height: 100%;
  }
}
</style>
