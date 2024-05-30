<script setup>
// ↑ 这里提示要添加 lang='ts'
import { RouterLink, RouterView } from 'vue-router'
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const isActive = ref(false);
const tag2 = () => {
  isActive.value = !isActive.value;
  router.push('/form')

};

</script>

<template>

  <div class="common-layout">
    <el-container>
      <el-aside width="260px" class="aside">

        <el-row class="tac" >
    <el-col >
      <h5 class="mb-2">Default colors</h5>
  
        <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
       
      >
        <el-menu-item index="1" >
          <el-icon><icon-menu /></el-icon>
          <span>主页</span>
        </el-menu-item>
        <el-menu-item index="2" @click="tag2" :style="{backgroundColor: isActive ? 'lightblue' : 'rgba(66,79,99,1)' }" >
          <el-icon><document /></el-icon>
          <span >提交表单</span>
        </el-menu-item>
        <el-menu-item index="3" >
          <el-icon><setting /></el-icon>
          <span>记事本</span>
        </el-menu-item>
        <el-menu-item index="4" >
          <el-icon><setting /></el-icon>
          <span>登录页</span>
        </el-menu-item>
        <el-menu-item index="5" >
          <el-icon><setting /></el-icon>
          <span>Blog</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>


      </el-aside>
      <el-main  class="main">
        <RouterView></RouterView>
      </el-main>
    </el-container>
  </div>
</template>


  

<style scoped>
/* 为了铺满全屏，使用了vh, vw 单位 */
.common-layout{
  height: 100vh;
  width: 100vw;
}
.main{
  background-color: rgba(240,241,242,1);
  width: 100%;
  height:100%;
}
.aside{background-color: rgba(66,79,99,1);
  border: 1px solid rgba(187,187,187,1);
  /* 侧边栏，高度铺满 */
  height: 100vh;  
}
.tac{
  line-height: 110px;
}
.el-menu-item {
    height: 40px;
background-color:rgba(66,79,99,1);
color:#FFFFFF ;
}
html,body{
  padding: 0;
  margin: 0;
}

</style>
