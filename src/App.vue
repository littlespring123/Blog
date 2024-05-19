<template>
  <!-- <el-button type="primary">Primary</el-button> -->
  <RouterView/>
  <div class="test">
    test class
  </div>
</template>
<script setup  >
 import {RouterLink,RouterView} from 'vue-router'

</script>
<!-- 注意style标签上面注释lang="scss" ,才能使用scss中自定义的属性-->
<style lang="scss" scoped>
.test{
  color:$priceColor;
}

</style>
