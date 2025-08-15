import { defineConfig } from 'vitepress'
import { set_sidebar } from "./utils/auto_sidebar.mjs";	// 改成自己的路径
// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/vitepress-notes/",
  head: [["link", { rel: "icon", href: "/vitepress-notes/021-daisy.png" }]],
  title: "记忆中",
  description: "A VitePress Site",
  themeConfig: {
    outlineTitle: '目录',
    outline: [2, 6],
    nav: [
      { text: 'Home',
        items: [
          { text: 'Home', link: '/' },
          { text: 'Markdown Examples', link: '/markdown-examples' }
        ],
       },
      {text:'笔记',link:'/front-end/java/'},
      {text:'资料收藏',link:'/resources'},
      { text: 'Examples', link: '/markdown-examples' }
    ],

    // sidebar: {
    //    "/front-end/java": set_sidebar("/front-end/java") 
    // },
    sidebar: false, // 关闭侧边栏
    aside: "left", // 设置右侧侧边栏在左侧显示
    socialLinks: [
      { icon: 'github', link: 'https://github.com/13145424485' }
    ],
    footer:{
      copyright: 'CopyRight © 2023-present Youzi'
    },
    // 设置搜索框的样式
    search: {
      provider: "local",
      options: {
        translations: {
          button: {
            buttonText: "搜索文档",
            buttonAriaLabel: "搜索文档",
          },
          modal: {
            noResultsText: "无法找到相关结果",
            resetButtonTitle: "清除查询条件",
            footer: {
              selectText: "选择",
              navigateText: "切换",
            },
          },
        },
      },
    },
  },
    
})
