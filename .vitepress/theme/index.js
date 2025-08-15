// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import LottieLogo from './components/LottieLogo.vue'
import LottieBackground from './components/LottieBackground.vue'
import LottieHero from './components/LottieHero.vue'

/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
      'nav-bar-title-before': () => h(LottieLogo),
      'home-hero-image': () => h(LottieHero),
      'layout-bottom': () => h(LottieBackground)
    })
  },
  enhanceApp({ app, router, siteData }) {
    app.component('LottieLogo', LottieLogo)
    app.component('LottieBackground', LottieBackground)
    app.component('LottieHero', LottieHero)
  }
}
