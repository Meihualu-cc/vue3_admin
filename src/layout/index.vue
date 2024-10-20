<template>
    <el-container>
        <el-header><Header></Header></el-header>
        <el-container>
            <el-aside width="200px"><Menu></Menu></el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
            
        </el-container>
    </el-container>
</template>
<script lang="ts" setup>
import Header from './components/Header.vue';
import Menu from './components/Menu.vue';
</script>
<style lang="less" scoped>
.el-header{
   padding: 0;
}
.el-container{
    height: 100%;
    .el-menu{
  height: 100%;
}
}
</style>