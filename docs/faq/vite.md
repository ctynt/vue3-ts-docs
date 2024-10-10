# 关于 Vite 创建项目
## 1. 安装 Vite
```bash
npm install -g create-vite

# 或者使⽤ yarn 或 pnpm ：
yarn global add create-vite
pnpm add -g create-vite
```

## 2. 创建 Vite 项目
```bash
npm create vite@latest

# 与 npm 类似，你也可以使⽤ yarn 或 pnpm 来创建 Vite 项⽬：
yarn create vite # 要 node18 及以下，否则报错
pnpm create vite
```

## 3. 选择模板
+ vanilla ：原⽣ JavaScript 项⽬ 
+ vanilla-ts ：原⽣ TypeScript 项⽬ 
+ vue ：Vue 3 项⽬ 
+ vue-ts ：Vue 3 + TypeScript 项⽬ 
+ react ：React 项⽬ 
+ react-ts ：React + TypeScript 项⽬ 
+ preact ：Preact 项⽬ 
+ preact-ts ：Preact + TypeScript 项⽬ 
+ lit ：Lit 项⽬ 
+ lit-ts ：Lit + TypeScript 项⽬ 
+ svelte ：Svelte 项⽬ 
+ svelte-ts ：Svelte + TypeScript 项⽬

## 4. 直接指定模板
```bash
npm create vite@latest my-vue-app -- --template vue
```

## 5. 项目启动和开发
```bash
cd my-vite-project
npm install
npm run dev
```

 运⾏ npm run dev 后，Vite 会启动⼀个开发服务器，通常会在 <a href="http://localhost:5173" target="_blank" rel="noreferrer">http://localhost:5173</a> 上运⾏。  

## 6. Vite 模板详细解释
### 6.1. Vue 模板
```bash
npm create vite@latest my-vue-app -- --template vue
```

这是⼀个基于 Vue.js 的模板。Vue 是⼀个渐进式 JavaScript 框架，⽤于构建⽤户界⾯ 和单⻚应⽤程序（SPA）。该模板创建的项⽬是基于 Vue 3 的。  

### 6.2. Vue + TypeScript 模板
```bash
npm create vite@latest my-vue-app -- --template vue-ts
```

这是⼀个基于 Vue.js 3 和 TypeScript 的模板。TypeScript 是 JavaScript 的⼀个 超集，增加了类型系统，可以帮助开发者编写更健壮的代码。  

### 6.3. React 模板
```bash
npm create vite@latest my-react-app -- --template react
```

这是⼀个基于 React 的模板。React 是⼀个⽤于构建⽤户界⾯的 JavaScript 库，尤 其适合构建单⻚应⽤程序。  

### 6.4. React + TypeScript 模板
```bash
npm create vite@latest my-react-app -- --template react-ts
```

这是⼀个基于 React 和 TypeScript 的模板。与纯 React 模板类似，但⽀持 TypeScript，以提供类型检查和更好的开发体验。  

### 6.5. Preact 模板
```bash
npm create vite@latest my-preact-app -- --template preact
```

这是⼀个基于 Preact 的模板。Preact 是⼀个轻量级的 React 替代品，提供类似的 API 但体积更⼩。  

### 6.6. Preact + TypeScript 模板
```bash
 npm create vite@latest my-preact-app -- --template preact-ts
```

这是⼀个基于 Preact 和 TypeScript 的模板。结合了 Preact 的轻量级优势和 TypeScript 的类型检查功能。  

### 6.7. Svelte 模板
```bash
npm create vite@latest my-svelte-app -- --template svelte
```

这是⼀个基于 Svelte 的模板。Svelte 是⼀个编译型前端框架，与传统的前端框架不 同，它在编译时将组件转换为⾼效的 JavaScript 代码。  

### 6.8. Svelte+ TypeScript 模板
```bash
npm create vite@latest my-svelte-app -- --template svelte-ts
```

这是⼀个基于 Svelte 和 TypeScript 的模板。将 Svelte 的编译特性与 TypeScript 的类型检查功能结合起来。  

### 6.9. Lit 模板
```bash
npm create vite@latest my-lit-app -- --template lit
```

这是⼀个基于 Lit 的模板。Lit 是⼀个⽤于构建 Web 组件的框架，专注于⾼效的组件创 建和管理。  

### 6.11. Vanilla 模板
```bash
npm create vite@latest my-vanilla-app -- --template vanilla
```

这是⼀个基于 Vanilla JavaScript 的模板。Vanilla JavaScript 指的是没有使⽤任何 框架或库的原⽣ JavaScript。  

### 6.12. Vanilla + TypeScript 模板
```bash
npm create vite@latest my-vanilla-app -- --template vanilla-ts
```

这是⼀个基于 Vanilla JavaScript 和 TypeScript 的模板。结合了原⽣ JavaScript 和 TypeScript 的功能。  