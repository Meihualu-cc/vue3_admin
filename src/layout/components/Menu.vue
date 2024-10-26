<template>
     <el-menu
        router
        class="el-menu-vertical-demo"
        default-active="/"
        mode="vertical"
      >
      <div v-for="(item,index) in menuList">
        <el-menu-item :index="item.path" :key="index">{{ item.meta.title }}</el-menu-item>
      </div>
      <!-- <el-menu-item index='/'>项目介绍</el-menu-item>
      <el-menu-item index='/user'>用户列表</el-menu-item>
      <el-menu-item index='/role'>角色列表</el-menu-item>
      <el-menu-item index='/auth'>权限列表</el-menu-item> -->
      </el-menu>
</template>
<script lang="ts" setup >
import { useRouter,useRoute } from 'vue-router';
const router = useRouter()
const route = useRoute()
const menuList = router.getRoutes().filter((item)=>{
  return item.meta.isShow
})
console.log('目录',router.getRoutes(),menuList)
</script>
<style lang="less" scoped> 

</style>