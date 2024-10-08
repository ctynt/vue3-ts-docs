import { defineConfig } from 'vitepress';

export default defineConfig({
    title: "Vue 3 + TypeScript 学习文档",
    description: "详细学习Vue 3 + TypeScript 的指南",
    themeConfig: {
        siteTitle: "前端学习",
        logo: "/assets/logo.png",
        nav: [
          { text: "首页", link: "/" },
          { text: "指南", link: "/guide/" },
          { text: "组件", link: "/components/" },
          { text: "API 参考", link: "/api/" },
          { text: "常见问题", link: "/faq/"}
        ],
        socialLinks: [
            { icon: "github", link: "https://github.com/vuejs/vue-next" },
        ], 
        sidebar: {
            "/guide/": [
                {
                    text: "开始",
                    collapsible: true,
                    items: [
                        { text: "介绍", link: "/guide/" },
                        { text: "安装", link: "/guide/installation" },
                        { text: "基本概念", link: "/guide/concepts"},
                    ], 
                }, 
            ], 
        }, 
        footer: {
            message: "用心学习 Vue3 和 TypeScript",
            copyright: "Copyright © 2024 ctynt"
        }
    }
})