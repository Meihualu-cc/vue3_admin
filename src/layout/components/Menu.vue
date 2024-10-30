<template>
     <el-menu
        router
        class="el-menu-vertical-demo"
        default-active="/"
        mode="vertical"
      >
      <template v-for="item in menuList" :key="item.path">
        <el-menu-item v-if="!item.children" :index="item.path" >{{ item.meta! .title }}</el-menu-item>
        <el-sub-menu v-else :index="item.path">
            <template #title>
              <span>{{item.meta!.title}}</span>
            </template>
            <el-menu-item v-for="res in item.children" :index="res.path" >{{ res.meta! .title }}</el-menu-item>
        </el-sub-menu>

        <!-- <div v-else>
          <template #title>
            <el-icon><location /></el-icon>
            <span>{{item.meta!.title}}</span>
          </template>
        <el-menu-item-group  :title="item.meta!.title+''">
            <el-menu-item v-for="res in item.children" :index="res.path">{{ res.meta! .title }}</el-menu-item>
          </el-menu-item-group>
        </div> -->
        
      </template>
      <!-- <el-menu-item index='/'>项目介绍</el-menu-item>
      <el-menu-item index='/user'>用户列表</el-menu-item>
      <el-menu-item index='/role'>角色列表</el-menu-item>
      <el-menu-item index='/auth'>权限列表</el-menu-item> -->
      </el-menu>
</template>
<script lang="ts" setup >
import { useRouter } from 'vue-router';

const router = useRouter()
// const menuList = router.getRoutes().filter((item)=>{
//   return item.meta.isShow
// })
const menuList = router.options.routes[0].children!.filter((item)=>{
  return item.meta!.isShow
})
console.log('目录',router.getRoutes(),menuList)
</script>
<style lang="less" scoped> 

</style>