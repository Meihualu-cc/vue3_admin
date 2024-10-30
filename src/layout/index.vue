<template>
    <el-container>
        <el-header>
            <Header></Header>
        </el-header>
        <el-container>
            <el-aside width="200px">
                <Menu></Menu>
            </el-aside>
            <el-main>
                <el-breadcrumb :separator-icon="ArrowRight">
                    <el-breadcrumb-item v-for="item in settingStore.title" :key="item" :to="{ name: item }">{{ item }}</el-breadcrumb-item>
                </el-breadcrumb>
                <router-view></router-view>
            </el-main>

        </el-container>
    </el-container>
</template>
<script lang="ts" setup>
import Header from './components/Header.vue';
import Menu from './components/Menu.vue';
import { ArrowRight } from '@element-plus/icons-vue'
import { useSettingStore } from '@/store/setting';
const settingStore = useSettingStore()
 </script>
<style lang="less" scoped>
.el-header {
    padding: 0;
}

.el-container {
    height: 100%;

    .el-menu {
        height: 100%;
    }
}

.el-breadcrumb {
    margin-bottom: 10px;
}
</style>