---
layout: home
title: Java 笔记
hero:
  name: Java 笔记
  text: 后端学习路线与实战笔记
  tagline: 选一条路径开始吧，或直接跳到常用速查。
  actions:
    - theme: brand
      text: 从基础开始
      link: /front-end/java/初学后端
    - theme: alt
      text: Redis 速查
      link: /front-end/java/redis
---

<div class="guide-grid">
  <a class="guide-card" href="/front-end/java/初学后端">
    <p class="label">入门</p>
    <p class="title">初学后端</p>
    <p class="desc">环境、语言基础、常见坑点和练手示例，快速把开发跑起来。</p>
    <span class="cta">阅读 &rarr;</span>
  </a>
  <a class="guide-card" href="/front-end/java/常见注释类">
    <p class="label">速查</p>
    <p class="title">常见注释类</p>
    <p class="desc">整理常用注解与语法片段，复制即用。</p>
    <span class="cta">查看 &rarr;</span>
  </a>
  <a class="guide-card" href="/front-end/java/常见类的使用">
    <p class="label">实践</p>
    <p class="title">常见类的使用</p>
    <p class="desc">集合、工具类、并发常用写法，带上手示例。</p>
    <span class="cta">进入 &rarr;</span>
  </a>
  <a class="guide-card accent" href="/front-end/java/redis">
    <p class="label">专题</p>
    <p class="title">Redis</p>
    <p class="desc">缓存、分布式锁、秒杀场景的踩坑记录与解决方案。</p>
    <span class="cta">快速跳转 &rarr;</span>
  </a>
</div>

<style scoped>
.guide-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
  margin-top: 32px;
}
.guide-card {
  display: block;
  position: relative;
  padding: 18px 20px;
  border-radius: 14px;
  background: linear-gradient(135deg, #f9fafb 0%, #f5f7fb 100%);
  border: 1px solid rgba(60, 60, 67, 0.08);
  box-shadow: 0 12px 32px -18px rgba(0, 0, 0, 0.2);
  transition: transform 160ms ease, box-shadow 160ms ease, border-color 160ms ease;
  text-decoration: none;
  color: inherit;
}
.guide-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 16px 40px -18px rgba(0, 0, 0, 0.28);
  border-color: rgba(60, 60, 67, 0.18);
}
.guide-card.accent {
  background: radial-gradient(120% 140% at 20% 20%, #eef3ff 0%, #f4f8ff 45%, #fdfdff 100%);
  border-color: rgba(40, 104, 235, 0.25);
}
.label {
  margin: 0 0 6px;
  font-size: 13px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: rgba(60, 60, 67, 0.55);
}
.title {
  display: inline-block;
  margin: 0 0 6px;
  font-size: 20px;
  font-weight: 700;
  color: #1e1e20;
  text-decoration: none;
}
.title:hover {
  color: #3067ff;
}
.desc {
  margin: 0 0 14px;
  color: rgba(60, 60, 67, 0.75);
  line-height: 1.6;
}
.cta {
  font-weight: 600;
  color: #3067ff;
  text-decoration: none;
}
.cta:hover {
  text-decoration: underline;
}
</style>
