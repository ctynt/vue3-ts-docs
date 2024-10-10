# VitePress 构建学习站点

## 1. 初始化vitepress项目

```bash
npm init vitepress@latest vue3-ts-docs
npm i
```
## 2.修改package.json

```json
"scripts": {
  "dev": "vitepress dev docs",
  "build": "vitepress build docs",
  "serve": "vitepress serve docs",
  "docs:dev": "vitepress dev docs",
  "docs:build": "vitepress build docs",
  "docs:preview": "vitepress preview docs"
}
```

## 3.在docs下建立目录和文件

![](https://ctynt-oss.oss-cn-hangzhou.aliyuncs.com/WebStudy/ViteStudy/menu.jpg)

## 4. 编写首页的index.md

**Tips：网页Logo使用oss存储**

```markdown
---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "前端工程化"
  text: "Vue 3 + TypeScript 学习文档"
  tagline: "夜色难免黑凉，前行必有曙光。"
  image:
    src: "oss图片地址"
    alt: 前端工程化
  actions:
    - theme: brand
      text: 快速开始
      link: /guide/
    - theme: alt
      text: 常见问题
      link: /faq/

features:
  - icon: 🔥
    title: 轻松入门
    details: 从头开始，循序渐进地学习 Vue 3 和 TypeScript。
  - icon: 💻 
    title: 最佳实践
    details: 涵盖从组件设计到代码优化的实际开发经验。
  - icon: 🚀 
    title: 高效开发
    details: 通过 VitePress 和 TypeScript，快速搭建高效、可维护的 Vue 3 应用。
---


<div style="text-align: center; margin-top: 50px;">
  <em>✨ Happy Coding! ✨</em>
</div>
```

## 5. 配置主页菜单

```typescript
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
            { text: "常见问题", link: "/faq/" }
        ],
        socialLinks: [
            { icon: "github", link: "你的github仓库地址" },
        ],
        sidebar: {
            "/guide/": [
                {
                    text: "开始",
                    collapsible: true,
                    items: [
                        { text: "介绍", link: "/guide/" },
                        { text: "安装", link: "/guide/installation" },
                        { text: "基本概念", link: "/guide/concepts" },
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
```


## 6. 引用vitepress样式

1. 引入依赖 vitepress-theme-demoblock 

```bash
npm i vitepress-theme-demoblock 
```

2. 在.vitepress目录下，新建theme/styles/var.css

```css
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: linear-gradient(135deg, #5fb4cb 10%, #13728d 100%);

  --vp-home-hero-image-background-image: linear-gradient(135deg, #5fb4cb 10%, #13728d 100%);
  --vp-home-hero-image-filter: blur(150px);

  --vp-button-brand-border: #5fb4cb;
  --vp-button-brand-text: #fff;
  --vp-button-brand-bg: #13728d;

  --vp-button-brand-hover-border: #a0d5c4;
  --vp-button-brand-hover-text: #fff;
  --vp-button-brand-hover-bg: #247b60;

  --vp-button-brand-active-border: #F6CEEC;
}
```

3. 在.vitepress目录下，新建theme/index.ts

```typescript
import DefaultTheme from 'vitepress/theme'

import 'vitepress-theme-demoblock/dist/theme/styles/index.css'

import './styles/var.css';

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
  }
}
```

效果图：

![](https://ctynt-oss.oss-cn-hangzhou.aliyuncs.com/WebStudy/ViteStudy/show.jpg)

## 7. Vercel 部署

推送到github仓库后，登录 [Vercel](https://vercel.com/)，托管网站。

![](https://ctynt-oss.oss-cn-hangzhou.aliyuncs.com/WebStudy/ViteStudy/vercel.jpg)

## 8. 编写LICENSE以及README
### 8.1. License

```bash
MIT License

Copyright (c) 2024 ctynt

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

### 8.2. 编写README

Shields.io<font style="color:rgb(77, 77, 77);"> 提供了一个网站来帮助你生成徽章 URL：</font>[GitHub License | Shields.io](https://shields.io/badges/git-hub-license)<font style="color:rgb(77, 77, 77);">。在该网站上，你可以选择</font>不同的<font style="color:rgb(77, 77, 77);">类型和样式的徽章，并根据你的需求进行自定义。</font>

如图

![](https://ctynt-oss.oss-cn-hangzhou.aliyuncs.com/WebStudy/ViteStudy/license.jpg)

```markdown
<p align="center">
  <img src="https://ctynt-oss.oss-cn-hangzhou.aliyuncs.com/logo.png" height="200" >
</p>

<h1 align="center">Vue 3 + TypeScript 学习文档</h1>
<p align="center">
  无论你是初学者还是有经验的开发者，这个站点都会帮助你掌握最新的 Vue 3 和 TypeScript 实践，从基础到进阶。
</p>

<p>

![Github License](https://img.shields.io/github/license/ctynt/vue3-ts-docs)
![Github Stars](https://img.shields.io/github/stars/ctynt/vue3-ts-docs)
![Github Forks](https://img.shields.io/github/forks/ctynt/vue3-ts-docs)

![Build Status](https://img.shields.io/github/workflow/status/ctynt/vue3-ts-docs/CI)
![NPM Version](https://img.shields.io/npm/v/vue)
![NPM Downloads](https://img.shields.io/npm/dw/vue)
![Maintenance](https://img.shields.io/maintenance/yes/2024)

</p>

## 🔥features

- 从头开始，循环渐进地学习 Vue 3 和 TypeScript。
- 涵盖了从组件设计到和代码优化的实际开发经验。
- 通过 VitePress 和 TypeScript，快速搭建高效、可维护的Vue 3应用

```

README效果：

![](https://ctynt-oss.oss-cn-hangzhou.aliyuncs.com/WebStudy/ViteStudy/readme.jpg)

## 9. 添加homepage以及github链接
在package.json中添加 Vercel 托管网址

```bash
"homepage": "vercel部署网址"
```

在config.ts中添加仓库链接

```bash
socialLinks: [
  { icon: "github", link: "你的github仓库地址" },
],
```

