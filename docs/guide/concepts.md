# Vue.js 3 基础概念 

## 插值语法
插值语法⽤于在模板中将 Vue 的响应式数据绑定到 DOM 中，最常⻅的⽅式是使⽤双花括号 {{}} ，它可以将组件的状态动态插⼊到 HTML 中。

```vue
<template>
    <div>
        <p>当前⽤户：{{ userName }}</p>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
// 定义⼀个响应式状态
const userName = ref<string>('张三')
</script>
```

在这个示例中：

+ {{ userName }} ⽤于动态显示 userName 状态的值。 
+ 当 userName 改变时，模板会⾃动更新显示。 

插值语法不仅可以插⼊变量，还可以插⼊简单的 JavaScript 表达式。 

```vue
<template>
    <div>
        <p>当前⽤户：{{ userName }}</p>
        <p>2 + 2 的结果是：{{ 2 + 2 }}</p>
        <p>⽤户全名：{{ firstName + ' ' + lastName }}</p>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
// 定义⼀个响应式状态
const userName = ref<string>('张三')
const firstName = ref<string>('张')
const lastName = ref<string>('三')
</script>
```

## 属性绑定
1. 基础属性绑定

<font style="color:rgb(38,38,38);">在 Vue 3 中， v-bind 可以直接绑定⼀个变量到 HTML 元素的属性上。</font>

```vue
<template>
  <div>
    <!-- 绑定isDisabled属性 -->
     <button :disabled="isDisabled">点击</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const isDisabled = ref<boolean>(false)
</script>
```

2. 绑定多个属性

<font style="color:rgb(38,38,38);">通过 v-bind 也可以⼀次性将多个属性动态绑定到元素上，这通常通过⼀个对象来实现。</font>

```vue
<template>
  <div>
    <!-- 绑定isDisabled属性 -->
     <button :disabled="isDisabled">点击</button>
     <button v-bind="buttonAttrs">点击我</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isDisabled = ref<boolean>(false)

import { reactive } from 'vue'
// 定义⼀个包含多个属性的对象
const buttonAttrs = reactive({
 disabled: false,
 title: '按钮已禁⽤',
 id: 'unique-button',
})

</script>
```

3. 绑定 class 和 style

Vue 3 的 v-bind 可以⾮常灵活地绑定 class 和 style 。通过绑定对象或数组，可以动 态地切换多个类名或样式。  

动态绑定：class

```vue
<template>
  <div>
    <p :class="pClass">这是一段文字</p>
    <button @click="toggleClass">切换</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const isHighLight = ref<boolean>(false)
const pClass = ref<{[key: string]: boolean}>({
    isHighLight: isHighLight.value,
    normal: !isHighLight.value
})
// 切换类名
const toggleClass = () => {
    isHighLight.value = !isHighLight.value
    pClass.value = {
        isHighLight: !isHighLight.value,
        normal: isHighLight.value
    }
}

</script>

<style>
.isHighLight {
    color: red;
}

.normal {
    color: black;
}
</style>

```

动态绑定：style

```vue
<template>
  <div>
    <p :style="pStyle">这是一段文字</p>
    <button @click="toggleClass">切换</button>
  </div>
</template>
  
  <script setup lang="ts">
import { ref } from "vue";

const isBold = ref<boolean>(false);
const pStyle = ref<{
    fontWeight: string
    color: string
}>({
    fontWeight: 'normal',
    color: 'black'
})

const toggleClass = () => {
    isBold.value = !isBold.value;
    pStyle.value = {
        fontWeight: isBold.value ? 'bold' : 'normal',
        color: isBold.value ? 'blue' : 'black'
    }
}
</script>
```

4. 动态绑定自定义属性

在 Vue 3 中，可以使⽤ v-bind 动态绑定⾃定义属性到任意 HTML 元素，尤其是在处理组件 时⾮常有⽤。  

```vue
<template>
    <div>
        <CustomButton :custom-attr="customValue">⾃定义按钮</CustomButton>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import CustomButton from './CustomButton.vue'
// ⾃定义属性值
const customValue = ref<string>('我是⾃定义属性')
</script>
```

```vue
<template>
    <button>{{ customAttr }}</button>
</template>
<script setup lang="ts">
import { defineProps } from 'vue'
// 使⽤ defineProps 声明⾃定义属性
defineProps<{
    customAttr: string
}>()
</script>
```

  上述代码如果报错：可以在项⽬的 src ⽬录下创建⼀个 shims-vue.d.ts ⽂件

```typescript
declare module '*.vue' {
  import { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
```

## 状态与方法
1. 状态（State）

 状态是组件内部存储和管理的数据，它在组件⽣命周期内变化，并驱动视图的更新。

+ ref ：适⽤于基本数据类型（如 number 、 string 、 boolean ）以及简单对象。 r ef 包装了⼀个值，并通过 .value 来访问或修改这个值。 
+ reactive ：适⽤于复杂对象（如数组、对象）。 reactive 将整个对象转换为响应式 的，当对象的任⼀属性发⽣改变时，Vue 会⾃动追踪这些变化。    

 代码示例：使⽤ ref 定义简单状态  

```vue
<template>
    <div>
        <p>当前计数：{{ count }}</p>
        <button @click="increment">增加计数</button>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const count = ref<number>(0)
const increment = ():void => {
    count.value++
}
</script>
```

 代码示例：使⽤ reactive 定义复杂对象状态  

```vue
<template>
    <div>
        <p>用户名：{{ user.name }}</p>
        <p>年龄：{{ user.age }}</p>
        <button @click="increaseAge">增加年龄</button>
    </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
const user = reactive<{ name: string; age: number }>({
    name: '张三',
    age: 25
})
const increaseAge = ():void => {
    user.age++
}
</script>
```

2. 方法（Methods）

 ⽅法是组件中⽤来处理业务逻辑、响应事件或对状态进⾏修改的函数。

 代码示例：定义⽆参数的⽅法    

```vue
<template>
    <div>
        <p>当前温度：{{ temperature }}°C</p>
        <button @click="increaseTemp">增加温度</button>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
// 定义温度状态
const temperature = ref<number>(20)
// 定义增加温度的⽅法
const increaseTemp = (): void => {
    temperature.value++
}
</script>
```

 代码示例：定义带参数的⽅法  

```vue
<template>
    <div>
        <p>当前计数：{{ count }}</p>
        <button @click="incrementBy(5)">增加 5</button>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
// 定义计数状态
const count = ref<number>(0)
// 定义带参数的⽅法
const incrementBy = (value: number): void => {
    count.value += value
}
</script>
```



3. 状态与方法结合使用

 通常，状态和⽅法是紧密结合的，⽅法通过操作状态来改变组件的⾏为或显示的内容。  

```vue
<template>
    <div>
        <p>当前用户：{{ user.name }}，年龄：{{  user.age}}</p>
        <button @click="changeName('李四')">修改用户名</button>
        <button @click="resetUser">重置用户信息</button>

    </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'


const user = reactive<{ name: string, age: number }>({
    name: '张三',
    age: 30
})

const changeName = (newName: string): void => {
    user.name = newName
}

const resetUser = (): void => {
    user.name = '张三',
    user.age = 30
}
</script>

<style scoped>

</style>
```

## 条件渲染与列表渲染
1. 条件渲染

条件渲染指的是根据某些条件，决定是否渲染某个 DOM 元素。  

在 Vue 中，使⽤ v-if 、 v-else-if 、 v-else 指令来实现条件渲染。 

+ v-if ：仅当条件为 true 时渲染元素。 
+ v-else-if ：为多个条件分⽀提供⽀持。 
+ v-else ：当所有 v-if 和 v-else-if 条件为 false 时，渲染 v-else 。  

 代码示例：基本的条件渲染  

```vue
<template>
    <div>
        <p v-if="isVisibity">该文本可见</p>
        <p v-else>该文本隐藏</p>
        <button @click="toggleVisibity">切换</button>

    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isVisibity = ref<boolean>(true)

const toggleVisibity = (): void => {
    isVisibity.value = !isVisibity.value
}
</script>
```

 代码示例：结合 v-if 和 v-else-if 的条件渲染  

```vue
<template>
    <div>
        <p v-if="userAge < 18">未成年用户</p>
        <p v-else-if="userAge >= 18 && userAge < 60">成年用户</p>
        <p v-else>老年用户</p>
        <button @click="increaseAge">增加年龄</button>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const userAge = ref<number>(16)

const increaseAge = ():void => {
    userAge.value++
}
</script>
```

2. 列表渲染

 列表渲染⽤于根据数组或对象的数据，动态渲染⼀组元素。  

 代码示例：遍历数组渲染列表  

```vue
<template>
  <ul>
    <li v-for="(item,index) in items" :key="index">{{ item }}</li>
  </ul>

</template>

<script setup lang="ts">
import { ref } from 'vue'

const items = ref<string[]>(['苹果','香蕉','橘子'])
</script>
```

 代码示例：遍历对象数组  

```vue
<template>
    <ul>
        <li v-for="user in users" :key="user.id">
            {{ user.name }} - {{ user.age }} 岁

        </li>
    </ul>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface User {
    id: number
    name: string
    age: number
}

const users = ref<User[]>([
    { id: 1, name: '张三', age: 25 },
    { id: 2, name: '李四', age: 30 },
    { id: 3, name: '王五', age: 35 }
])
</script>
```

 代码示例：使⽤索引渲染列表  

```vue
<template>
    <ul>
        <li v-for="(item, index) in items" :key="index">
            {{ index + 1 }}. {{ item }}
        </li>
    </ul>
</template>
<script setup lang="ts">
import { ref } from 'vue'
// 定义⼀个字符串数组状态
const items = ref<string[]>(['HTML', 'CSS', 'JavaScript'])
</script>
```

3. 条件渲染与列表渲染结合使用

在实际项⽬中，条件渲染和列表渲染经常结合使⽤。可以根据某些条件决定是否渲染整个列表，或 者在列表中根据不同条件渲染不同的内容。   

代码示例：根据条件渲染列表中的内容  

```vue
<template>
    <ul>
        <li v-for="user in users" :key="user.id">
            {{ user.name }} -
            <span v-if="user.age >= 18">成人</span>
            <span v-else>未成年</span>
        </li>
    </ul>
 
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface User {
    id: number
    name: string
    age: number
}

const users = ref<User[]>([
    { id: 1, name: '张三', age: 25 },
    { id: 2, name: '李四', age: 30 },
    { id: 3, name: '王五', age: 35 }
])

</script>
```

## 计算属性与监听器
1. 计算属性

计算属性是基于响应式数据的派⽣状态。当依赖的数据发⽣变化时，计算属性会⾃动更新，并且具 有缓存特性，只有当依赖的数据改变时，计算属性才会重新计算。它适⽤于处理复杂的逻辑或基于 多个状态进⾏组合计算。  

 代码示例：使⽤计算属性计算折扣价格  

```vue
<template>
    <div>
        <p>原价：{{ price }}</p>
        <p>折扣：{{ discount }}</p>
        <p>折后价：{{ discountedPrice }}</p>

    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const price = ref<number>(100)
const discount = ref<number>(0.8)

const discountedPrice = computed(() => {
    return price.value * discount.value
})
</script>
```

在 TypeScript 中，可以为计算属性的返回值显式声明类型，以确保代码的类型安全。 

代码示例：计算属性类型声明  

```vue
<template>
    <div>
        <p>年薪：{{ yearlySalary }}</p>

    </div>
</template>

<script setup lang="ts">
import { computed,ref } from 'vue'

const monthlySalary = ref<number>(5000)

const yearlySalary = computed<number>(() => {
    return monthlySalary.value * 12
    
})
</script>
```

2. 监听器

监听器⽤于监听响应式数据的变化，并在变化时执⾏特定的副作⽤函数。它通常⽤于处理需要响应 数据变化的复杂逻辑，特别是副作⽤（例如，发送 API 请求、⽇志记录、处理深层次对象等）。 监听器不会⾃动缓存，因此每次数据变化时都会触发。 

+ 简单监听：监听单个状态的变化。 
+ 深度监听：监听对象或数组中的嵌套属性的变化。  

 代码示例：监听⽤户输⼊并打印  

```vue
<template>
    <div>
        <input v-model="searchQuery" placeholder="搜索关键词" />
    </div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
// 定义搜索关键词的状态
const searchQuery = ref<string>('')
// 监听搜索关键词的变化
watch(searchQuery, () => {
    console.log('搜索关键词', searchQuery.value)
})
</script>
```

 代码示例：监听多个状态  

```vue
<template>
    <div>
        <input v-model="firstName" placeholder="输⼊名" />
        <input v-model="lastName" placeholder="输⼊姓" />
        <p>全名：{{ fullName }}</p>
    </div>
</template>
<script setup lang="ts">
import { ref, watch, computed } from 'vue'
// 名字和姓⽒状态
const firstName = ref<string>('张')
const lastName = ref<string>('三')
// 计算全名
const fullName = computed(() => `${firstName.value} ${lastName.value}`)
// 监听名和姓的变化
watch([firstName, lastName], ([newFirstName, newLastName]) => {
    console.log(`全名变为：${newFirstName} ${newLastName}`)
})
</script>
```

 当需要监听对象或数组中的嵌套属性时，必须使⽤深度监听。通过在 watch 的第三个参数中设 置 deep: true 来启⽤深度监听  

代码示例：深度监听对象  

```vue
<template>
    <div>
        <input v-model="user.name" placeholder="输⼊姓名" />
        <input v-model="user.age" type="number" placeholder="输⼊年龄" />
        <p>{{ user.name }}，{{ user.age }}岁</p>
    </div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
// 定义⽤户对象
const user = ref<{ name: string; age: number }>({
    name: '张三',
    age: 25,
})
// 深度监听⽤户对象
watch(user, (newUser) => {
    console.log(`⽤户信息更新为：${newUser.name}, ${newUser.age}`)
}, { deep: true })
</script>
```

 监听器默认情况下是在被监听的数据发⽣变化时才会触发。如果希望监听器在绑定时⽴即执⾏，可 以通过 immediate: true 选项。 

代码示例：⽴即执⾏的监听器  

```vue
<template>
    <div>
        <input v-model="userName" placeholder="输⼊⽤户名" />
    </div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
// ⽤户名状态
const userName = ref<string>('张三')
// ⽴即执⾏监听器
watch(userName, (newName) => {
    console.log(`⽤户名为：${newName}`)
}, { immediate: true })
</script>
```

3. 计算属性与监听器的对比
+ <font style="color:rgb(38,38,38);">计算属性： </font>
    - <font style="color:rgb(38,38,38);">适⽤于基于响应式状态派⽣出新的数据； </font>
    - <font style="color:rgb(38,38,38);">有缓存特性，只有当依赖的状态变化时才会重新计算； </font>
    - <font style="color:rgb(38,38,38);">返回的是计算后的结果。 </font>
+ <font style="color:rgb(38,38,38);">监听器： </font>
    - <font style="color:rgb(38,38,38);">适⽤于处理副作⽤，例如监听数据变化后执⾏ API 请求或记录⽇志； </font>
    - <font style="color:rgb(38,38,38);">没有缓存特性，每次监听的数据变化都会执⾏； </font>
    - <font style="color:rgb(38,38,38);">不返回计算结果，⽽是⽤于响应数据的变化。</font>

## 事件处理
1. 基本事件处理

事件处理指的是在 Vue 模板中监听 DOM 事件，并在事件触发时调⽤对应的⽅法。 

常⻅的事件有 click 、 input 、 submit 等。  

代码示例：点击按钮触发事件  

```vue
<template>
    <button @click="handleClick">点击我</button>
    <p>{{ message }}</p>
</template>
<script setup lang="ts">
import { ref } from 'vue'
// 定义⼀个消息状态
const message = ref<string>('还没有点击按钮')
// 事件处理函数
const handleClick = (): void => {
    message.value = '按钮已被点击'
}
</script>
```

在事件处理器中，可以访问原⽣的事件对象（如 MouseEvent 、 KeyboardEvent 等）。通 过将事件对象作为参数传递给处理器，能够获取到更多关于事件的详细信息。 

代码示例：访问事件对象  

```vue
<template>
    <button @click="handleClick">点击获取⿏标坐标</button>
    <p>点击位置：X: {{ x }}, Y: {{ y }}</p>
</template>
<script setup lang="ts">
import { ref } from 'vue'
// 定义⿏标点击位置状态
const x = ref<number>(0)
const y = ref<number>(0)
// 处理点击事件并获取⿏标点击位置
const handleClick = (event: MouseEvent): void => {
    x.value = event.clientX
    y.value = event.clientY
}
</script>
```

2. 事件修饰符

Vue 提供了⼀些常⽤的事件修饰符，可以简化事件处理的逻辑，例如阻⽌默认⾏为或事件冒泡。 .prevent ⽤于阻⽌元素的默认⾏为，等同于调⽤ event.preventDefault() 。 

代码示例：阻⽌表单提交  

```vue
<template>
    <form @submit.prevent="handleSubmit">
        <input v-model="inputValue" placeholder="输⼊内容" />
        <button type="submit">提交</button>
    </form>
</template>
<script setup lang="ts">
import { ref } from 'vue'
// 定义输⼊框状态
const inputValue = ref<string>('')
// 提交事件处理函数
const handleSubmit = (): void => {
    console.log(`提交的内容：${inputValue.value}`)
}
</script>
```

.stop ⽤于阻⽌事件冒泡，等同于调⽤ event.stopPropagation() 。 

代码示例：阻⽌事件冒泡  

```vue
<template>
    <div @click="handleOuterClick">
        <button @click.stop="handleButtonClick">点击按钮</button>
    </div>
</template>
<script setup lang="ts">

// 处理外层 div 的点击事件
const handleOuterClick = (): void => {
    alert('点击了外层 div')
}
// 处理按钮的点击事件
const handleButtonClick = (): void => {
    alert('点击了按钮')
}
</script>
```

.once 使得事件处理器只执⾏⼀次，事件触发后即解绑。 

代码示例：按钮点击仅触发⼀次  

```vue
<template>
    <button @click.once="handleClickOnce">点击⼀次</button>
    <p>{{ message }}</p>
</template>
<script setup lang="ts">
import { ref } from 'vue'
// 定义消息状态
const message = ref<string>('按钮还未点击')
// 事件处理函数
const handleClickOnce = (): void => {
    message.value = '按钮已被点击'
}
</script>
```

3. 按键修饰符

Vue 提供了按键修饰符，可以⽅便地处理键盘事件。例如，捕获回⻋键、Esc 键等特殊键的输⼊。 

.enter 监听 Enter 键的按下，适⽤于输⼊表单或其他键盘交互。

代码示例：监听 Enter 键  

```vue
<template>
    <input @keyup.enter="submitInput" v-model="inputValue" placeholder="按下回⻋提交" />
    <p>{{ message }}</p>
</template>
<script setup lang="ts">
import { ref } from 'vue'
// 定义输⼊框内容和提交信息
const inputValue = ref<string>('')
const message = ref<string>('尚未提交')
// 处理回⻋键提交
const submitInput = (): void => {
    message.value = `已提交：${inputValue.value}`
}
</script>
```

4. 自定义事件

Vue 允许组件之间通过⾃定义事件进⾏通信。在⽗组件中，可以通过 @ 监听⼦组件触发的事 件。⼦组件可以通过 emit ⽅法触发⾃定义事件。⽗组件可以通过 v-on 监听这些⾃定义事 件。 

代码示例：⼦组件触发事件 ⼦组件 Child.vue  

```vue
<template>
    <button @click="notifyParent">通知⽗组件</button>
</template>
<script setup lang="ts">
import { defineEmits } from 'vue'
// 定义 emit 事件
const emit = defineEmits(['notify'])
// 通知⽗组件的函数
const notifyParent = (): void => {
    emit('notify', '⼦组件已点击按钮')
}
</script>
```

 ⽗组件 Parent.vue  

```vue
<template>
    <Child @notify="handleNotification" />
    <p>{{ message }}</p>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import Child from './Child.vue'
// 定义接收的消息状态
const message = ref<string>('等待⼦组件通知')
// 处理来⾃⼦组件的通知
const handleNotification = (msg: string): void => {
    message.value = msg
}
</script>
```

5. 事件传参

在事件处理器中，可以传递参数给事件处理函数。这可以通过内联处理器或⽅法的⽅式实现。 

代码示例：传递参数给事件处理函数  

```vue
<template>
    <button @click="increment(5)">增加 5</button>
    <p>当前计数：{{ count }}</p>
</template>
<script setup lang="ts">
import { ref } from 'vue'
// 计数状态
const count = ref<number>(0)
// 事件处理函数，增加指定数值
const increment = (value: number): void => {
    count.value += value
}
</script>
```

## 表单双向绑定
1. 基本用法

v-model 指令⽤于创建双向绑定，允许⽤户通过表单控件修改 Vue 组件中的数据，同时 Vue 组件的数据变化也会同步更新到表单控件。

代码示例：⽂本输⼊框的双向绑定  

```vue
<template>
    <div>
        <input v-model="name" placeholder="请输⼊姓名" />
        <p>您输⼊的姓名是：{{ name }}</p>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
// 定义双向绑定的状态
const name = ref<string>('') // 初始值为空字符串
</script>
```

v-model 不仅可以应⽤于⽂本输⼊框，还可以应⽤于复选框、单选框、选择框等多种表单 控件。 

代码示例：复选框的双向绑定  

```vue
<template>
    <div>
        <input type="checkbox" v-model="isChecked" /> 勾选此项
        <p>复选框状态：{{ isChecked ? '已勾选' : '未勾选' }}</p>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
// 定义复选框的绑定状态
const isChecked = ref<boolean>(false) // 初始状态为未勾选
</script>
```

 代码示例：单选按钮的双向绑定  

```vue
<template>
    <div>
        <input type="radio" v-model="selectedOption" value="A" /> 选项 A
        <input type="radio" v-model="selectedOption" value="B" /> 选项 B
        <p>您选择的选项是：{{ selectedOption }}</p>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
// 定义单选框的选项状态
const selectedOption = ref<string>('A') // 初始值为选项 A
</script>
```

 代码示例：下拉选择框的双向绑定  

```vue
<template>
    <div>
        <select v-model="selectedItem">
            <option disabled value="">请选择⼀个选项</option>
            <option value="苹果">苹果</option>
            <option value="⾹蕉">⾹蕉</option>
            <option value="橘⼦">橘⼦</option>
        </select>
        <p>您选择的⽔果是：{{ selectedItem }}</p>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
// 定义下拉菜单的选项状态
const selectedItem = ref<string>('') // 初始值为空字符串
</script>
```

2. 多个复选框的绑定

当使⽤多个复选框时，可以将它们的值绑定到⼀个数组，通过 v-model 将选中的项加⼊到数组中。 

代码示例：多个复选框的绑定  

```vue
<template>
    <div>
        <label>
            <input type="checkbox" v-model="selectedFruits" value="苹果" />
            苹果
        </label>
        <label>
            <input type="checkbox" v-model="selectedFruits" value="⾹蕉" />
            ⾹蕉
        </label>
        <label>
            <input type="checkbox" v-model="selectedFruits" value="橘⼦" />
            橘⼦
        </label>
        <p>您选择的⽔果：{{ selectedFruits.join(', ') }}</p>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
// 选中的⽔果会以数组的形式存储
const selectedFruits = ref<string[]>([]) // 初始值为空数组
</script>
```

3. 修饰符的使用

Vue 3 中的 v-model 提供了许多修饰符，⽤于更细粒度地控制双向绑定的⾏为。 常⻅的修饰符有 .lazy 、 .number 和 .trim 。  

默认情况下， v-model 会在 input 事件中同步数据，但使⽤ .lazy 修饰符可以延迟到 change 事件时才同步数据。 

代码示例：使⽤ .lazy 修饰符  

```vue
<template>
    <div>
        <input v-model.lazy="name" placeholder="请输⼊姓名" />
        <p>您输⼊的姓名是：{{ name }}</p>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
// 定义姓名的状态
const name = ref<string>('') // 初始值为空字符串
</script>
```

.number 修饰符⽤于⾃动将⽤户输⼊的内容转换为数字。 

代码示例：使⽤ .number 修饰符  

```vue
<template>
    <div>
        <input v-model.number="age" type="number" placeholder="请输⼊年龄" />
        <p>您的年龄是：{{ age }}</p>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
// 定义年龄的状态
const age = ref<number | null>(null)
</script>
```

.trim 修饰符可以⽤于⾃动删除⽤户输⼊中的⾸尾空格。 

代码示例：使⽤ .trim 修饰符  

```vue
<template>
    <div>
        <input v-model.trim="username" placeholder="请输⼊⽤户名" />
        <p>您的⽤户名是：{{ username }}</p>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
// 定义⽤户名的状态
const username = ref<string>('') // 初始值为空字符串
</script>
```

4. v-model 与组件

 在⾃定义组件中使⽤ v-model 。⾃定义组件中的 v-model 会默认绑定到 modelValue 属性，并通过 update:modelVal ue 事件来更新数据。  

代码示例：在⾃定义组件中使⽤ v-model ⼦组件 CustomInput.vue  

```vue
<template>
    <input :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" />
</template>
<script setup lang="ts">
// 接收 modelValue 作为输⼊框的值
defineProps({
    modelValue: String
})
</script>
```

⽗组件 CustomInputParent.vue  

```vue
<template>
    <div>
        <CustomInput v-model="inputText" />
        <p>输⼊的⽂本是：{{ inputText }}</p>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import CustomInput from './CustomInput.vue'
// 定义输⼊⽂本的状态
const inputText = ref<string>('')
</script>
```

5. v-model 的多绑定语法

在 Vue 3 中， v-model ⽀持多绑定语法，可以为⼀个组件中的多个值使⽤ v-model。

代码示例：v-model 的多绑定语法 

⼦组件 DateTimePicker.vue  

```vue
<template>
    <input type="date" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" />
    <input type="time" :value="timeValue" @input="$emit('update:timeValue', $event.target.value)" />
</template>
<script setup lang="ts">
defineProps({
    modelValue: String,
    timeValue: String
})
</script>
```

⽗组件 DateTimePickerPrent.vue  

```vue
<template>
    <div>
        <DateTimePicker v-model="date" v-model:timeValue="time" />
        <p>⽇期：{{ date }}</p>
        <p>时间：{{ time }}</p>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import DateTimePicker from './DateTimePicker.vue'
// 定义⽇期和时间的状态
const date = ref<string>('')
const time = ref<string>('')
</script>
```

## DOM 操作
 Vue 3 中常⻅的 DOM 操作包括： 

+ 使⽤ ref 获取 DOM 元素的引⽤； 
+ 在⽣命周期钩⼦中操作 DOM 元素； 
+ 通过 v-bind 动态修改属性或类； 
+ 操作 style 和 class ； 
+ 事件处理及⾃定义指令。  



1. 基本用法

 代码示例：获取并操作 DOM 元素  

```vue
<template>
    <div>
        <input ref="inputElement" type="text" placeholder="聚焦在此" />
        <button @click="focusInput">点击聚焦输⼊框</button>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
// 获取 DOM 元素的引⽤
const inputElement = ref<HTMLInputElement | null>(null)
// 操作 DOM 元素
const focusInput = () => {
    if (inputElement.value) {
        inputElement.value.focus() // 让输⼊框获得焦点
    }
}
</script>
```

2. 生命周期钩子中的 DOM 操作

 代码示例：在组件挂载后操作 DOM 2.

```vue
<template>
    <div ref="box" class="box">我是⼀个⽅块</div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
// 获取 DOM 元素引⽤
const box = ref<HTMLDivElement | null>(null)
// 在组件挂载后操作 DOM
onMounted(() => {
    if (box.value) {
        box.value.style.backgroundColor = 'lightblue' // 修改⽅块的背景⾊
    }
})
</script>
<style scoped>
.box {
    width: 100px;
    height: 100px;
    background-color: gray;
}
</style>
```
