# 渐进式博客系统

*通过前面的小练手项目，最终实现一个自己的博客*

## 相关文档

[UI](https://modao.cc/proto/2DjPKsqCsdppl9O2lnqM25/sharing?view_mode=read_only )

[Element Plus 组件文档](https://element-plus.org/zh-CN/)

[接口文档](https://console-docs.apipost.cn/preview/26927aad180bca07/4e6f5b27b8a8d6a4)



## 知识点

*列举涉及的知识点，不用单独学*

### 基础

HTML标签使用（div, audio），css基本使用

js的基本使用

1. 创建变量，函数
2. 数组，对象的使用
3. promise, async, await
4. 

### 组件库

使用[Element Plus](https://element-plus.org/zh-CN/) (表单，表格)

### vue

基础（ref, 双向绑定，指令，生命周期, watch, computed）
路由（路由守卫）
pinia
组件化（父子通信）

```vue
// vue文件基本结构
<template>
	<div @click="changeName('new')" class="root">
        用户名：{{people.name}}
    </div>
</template>
<script setup lang="">
    import { ref } from "vue"
    // 定义变量
    const people = ref({name:""})
    // 定义方法
    const changeName=(str)=>{
        people.value.name = str
    }
</script>
<style scoped lang="">
    .root{
        display: flex;
    }
</style>
```



### 工具

eslint 检查代码中的问题

prettier 格式化

[markdown](https://markdown.com.cn/basic-syntax/) 写文档

```html
<!-- 一些markdowm基本语法 -->
# 一级标题
## 二级标题
### 三级标题
#### 四级标题
##### 五级标题
###### 六级标题
* 斜体 *
** 粗体 **
***粗斜体***
> 我是引用

​```vue
	代码块
​```
<!-- 就这些，够用了，够用了 -->
```



## 基本结构

```sh

└─src
    ├─api 接口
    ├─assets
    ├─components 自定义组件
    │  └─Player
    ├─pages 页面
    │  ├─Home 主页
    │  ├─Form 提交表单
    │  ├─Todo 记事本
    │  ├─Login 登录页
    │  └─ Blog 博客页面
    ├─router 路由
    ├─stores pinia存储的位置
    └─utils 工具集
```

## 进度安排

### 建项目(1周)

*知识点：vite, 路由，页面布局css*

#### 步骤

1. 创建项目，[建gitee仓库](https://blog.csdn.net/nonita/article/details/129498672#:~:text=gitee创建新仓库并上传代码 一、登录gitee 链接%3A gitee远程仓库 在对应位置输入账号和密码%2C新用户可自行创建,二、创建仓库 2.1 在页面右上角"%2B"%2C选择创建仓库 2.2 输入仓库名称，其他勾选项可自行选择，在这里直接点击创建。)，建立链接，提交代码

   >每次提交代码的操作：
   >
   >// 使用git bash依次操作
   >
   >git add .          暂存所有的代码
   >
   >git commit -m "xxx"   提交信息（比如：实现了什么功能）
   >
   >git pull origin master   拉取代码（因为可能别人提交了代码）
   >
   >git push origin master  推送代码 OK!

2. [安装 | Element Plus (element-plus.org)](https://element-plus.org/zh-CN/guide/installation.html)

   使用npm的方式引入

3. 基本布局，创建导航栏和路由

   [Container 布局容器 | Element Plus (element-plus.org)](https://element-plus.org/zh-CN/component/container.html)

   ![layout](http://121.41.112.199/static/images/layout.png)

   [Vue3 路由](https://blog.csdn.net/qq_45758854/article/details/132404323)

   [Menu 菜单 | Element Plus ](https://element-plus.org/zh-CN/component/menu.html#侧栏)   选侧栏

   

   

4. 熟悉组件库，以后所有的需求，都是查文档，实现
   [Overview 组件总览 | Element Plus (element-plus.org)](https://element-plus.org/zh-CN/component/overview.html)

5. 提交代码，大功告成！

### 提交表单（1周）

*知识点：表单基本使用*

文档：[Form 表单 | Element Plus](https://element-plus.org/zh-CN/component/form.html)

#### 要求

1. 基本还原界面
2. 要有表单验证

### 记事本Todo（2周）

*知识点：函数的基本使用，列表组件，*

文档：[Input 输入框 | Element Plus](https://element-plus.org/zh-CN/component/input.html)
 没看到list，用table代替 [Table 表格 | Element Plus](https://element-plus.org/zh-CN/component/table.html)

#### 要求

1. 可以添加，删除，修改，可以多选（这些文档里都有）

```vue
// 基本结构：输入部分 + 展示部分
<template>
	<div>
        <!-- 输入部分的代码 -->
    </div>
	<div>
        <!-- 展示部分的代码 table -->
    </div>
</template>

<script setup>
	// 定义变量
    // 定义操作：增删改(分别是一个函数)
</script>

<style scoped lang="">
    /* 布局flex */
</style>

```

### 登录页（3周）

*知识点：权限判断，封装请求，表单*

#### 步骤

1. 先封装请求，[vue3进行axios请求封装](https://juejin.cn/post/7036341194716086279)
2. 与后端连接，查看 [接口文档](https://console-docs.apipost.cn/preview/26927aad180bca07/4e6f5b27b8a8d6a4) 找到user - 登录，可以看到`接口地址，请求参数`
3. 页面样式基本实现
4. 实现登录功能
5. 提交代码

```vue
// 登录页面的实现
<template>
	<!-- 一个表单 -->
</template>

<script setup>
	// 变量:
    // 操作：登录
</script>

<style scoped>
</style>
```



### 音乐播放器组件（3周）

*知识点：封装组件，接口，css，看复杂一点的文档*

### 步骤

1. 创建文件 /src/components/player.vue

2. [查看music接口文档](https://console-docs.apipost.cn/preview/26927aad180bca07/4e6f5b27b8a8d6a4?target_id=fedca3fd-0f91-40d3-b424-6185c614fa6a)

   >音乐接口使用：
   >
   >1. 先获取列表（发送请求）
   >2. 点击列表中某一项（获取音乐id）
   >3. check音乐（发送请求，参数是 上一步的id）
   >4. 播放音乐（如果上一步完成，发送请求，获取音乐链接）
   >5. 把获取的音乐链接，放到`<audio></audio>`标签中

3. [audio标签的使用](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/audio)

   ```html
   <audio controls :src="音乐链接"></audio>
   ```

4. 

### 优化，复盘（1周）

*没有需求，把之前写的进行优化*

#### 思考方向

**代码优化**

1. 

**Vue优化**

1. 渲染列表时，使用key

   >Vue渲染原理：每次修改响应式时，都会比较新/旧虚拟节点（使用diff算法），有变化才会进行重绘。
   >比较虚拟节点是否变化，key是其中一种判断依据

2. 路由相关：使用keep-alive
   页面切换时，是否缓存页面

3. 长列表优化
   使用分页，懒加载

4. 使用v-show替代v-if

   >v-show改变的样式display: none
   >
   >v-if是删除节点，会触发浏览器的重绘，重排

5. 

### 文件上传(暂定)

*知识点：表单校验， 文件处理*

### 博客（一个月）

*知识点：以上所有的知识的总和*

## 注意事项

1. 找个地方，写笔记（线上，本地，手写都可以）

2. 用好AI工具
   [文心一言](https://yiyan.baidu.com/welcome) chatGpt的平替

   [天工AI](https://www.tiangong.cn/)  搜集全网的资料，回答问题
   
   [Kimi.ai](https://kimi.moonshot.cn/) 长文本


3.  写了代码，要提交