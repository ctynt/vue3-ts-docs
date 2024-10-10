# VueUse API 
VueUse 是一个基于 Vue 3 的强大工具库，可以显著简化 Vue 3 开发中的常见需求，如鼠标跟踪、窗口大小检测、本地存储、主题切换等。这些 API 轻量且易于使用，非常适合快速开发项目。

使用[VueUse Playground](https://play.vueuse.org/)可以在线查看代码效果
## 1. `useMouse` - 跟踪鼠标位置
这个 API 用来实时获取鼠标的位置坐标（`x` 和 `y`）。

```vue
<template>
  <div>
    <p>鼠标位置: X: {{ x }} Y: {{ y }}</p>

  </div>

</template>

<script setup lang="ts">
import { useMouse } from '@vueuse/core'

const { x, y } = useMouse()
</script>
```

## 2. `useWindowSize` - 获取窗口大小
该 API 用来实时获取窗口的宽度和高度。

```vue
<template>
  <div>
    <p>窗口宽度: {{ width }}px</p>

    <p>窗口高度: {{ height }}px</p>

  </div>

</template>

<script setup lang="ts">
import { useWindowSize } from '@vueuse/core'

const { width, height } = useWindowSize()
</script>

```

## 3. `useDark` 和 `useToggle` - 夜间模式切换
这个 API 可以轻松实现页面的夜间模式切换。

```vue
<template>
  <div :class="{ dark: isDark }">
    <p>当前主题: {{ isDark ? '夜间模式' : '白天模式' }}</p>

    <button @click="toggleDark">
      {{ isDark ? '切换至白天模式' : '切换至夜间模式' }}
    </button>

  </div>

</template>

<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<style scoped>
.dark {
  background-color: #333;
  color: white;
}
</style>

```

## 4. `useLocalStorage` - 使用本地存储
`useLocalStorage` 可以轻松实现将状态保存在浏览器的 `localStorage` 中。

```vue
<template>
  <div>
    <input v-model="name" placeholder="输入姓名" />
    <p>保存的姓名: {{ name }}</p>

  </div>

</template>

<script setup lang="ts">
import { useLocalStorage } from '@vueuse/core'

const name = useLocalStorage('name', '')
</script>

```

## 5. `useOnline` - 检测网络状态
`useOnline` 用于检测用户的在线状态。

```vue
<template>
  <div>
    <p>{{ online ? '你当前在线' : '你当前离线' }}</p>

  </div>

</template>

<script setup lang="ts">
import { useOnline } from '@vueuse/core'

const online = useOnline()
</script>

```

## 6. `useDebounce` - 防抖处理
`useDebounce` 用于防止频繁操作，例如输入时避免频繁触发搜索请求。

```vue
<template>
  <div>
    <input v-model="searchQuery" placeholder="输入搜索内容" />
    <p>防抖后的搜索内容: {{ debouncedQuery }}</p>

  </div>

</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useDebounce } from '@vueuse/core'

const searchQuery = ref('')
const debouncedQuery = useDebounce(searchQuery, 500)
</script>

```

## 7. `useClipboard` - 剪贴板操作
使用 `useClipboard` 可以快速实现复制文本到剪贴板。

```vue
<template>
  <div>
    <input v-model="text" placeholder="输入要复制的文本" />
    <button @click="copy()">复制到剪贴板</button>

    <p>{{ copied ? '已复制！' : '' }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useClipboard } from '@vueuse/core'

const text = ref('')
const { copy, copied } = useClipboard({ source: () => text.value })
</script>
```

## 8. `useFetch` - 数据请求
`useFetch` 可以简化 API 请求的流程。

```vue
<template>
  <div>
    <button @click="fetchData">获取数据</button>

    <div v-if="isFetching">加载中...</div>

    <pre v-else>{{ data }}</pre>

  </div>

</template>

<script setup lang="ts">
import { useFetch } from '@vueuse/core'

const { data, isFetching, execute: fetchData } = useFetch('https://jsonplaceholder.typicode.com/posts/1').json()
</script>

```

## 9. `useEventListener` - 事件监听
`useEventListener` 可以快速为 DOM 元素添加事件监听器。

```vue
<template>
  <div>
    <p>窗口大小: 宽度 {{ width }}px 高度 {{ height }}px</p>

  </div>

</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useEventListener } from '@vueuse/core'

const width = ref(window.innerWidth)
const height = ref(window.innerHeight)

useEventListener(window, 'resize', () => {
  width.value = window.innerWidth
  height.value = window.innerHeight
})
</script>
```

## 10. `useTitle` - 动态修改页面标题
`useTitle` 可以帮助你动态修改页面标题。

```vue
<template>
  <div>
    <input v-model="title" placeholder="输入页面标题" />
  </div>

</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useTitle } from '@vueuse/core'

const title = ref('默认标题')
useTitle(title)
</script>
```





