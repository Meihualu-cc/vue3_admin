<template>
  <div class="header">
    <div class="flex-center ">
        logo区域
      <!-- <img src="/logo.png" alt="logo" /> -->
    </div>
    <div class="flex-grow">

    </div>
    <div class="flex-center m05 corlor-dark-black"><i-ep-user> </i-ep-user>{{ userName }}</div>
    <div class="flex-center m05 corlor-dark-black pointer" @click="handelSetting"> <i-ep-setting></i-ep-setting></div>
  </div>
  <el-drawer v-model="showStting" :show-close="false" :with-header="false" :size="300">
    <div>
        项目配置
    </div>
    <div class="flex-center">
        <el-button  type="primary" @click="logOut">退出</el-button>
    </div>
  </el-drawer>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import {useUserStoreHook} from '@/store/user';
const useStore = useUserStoreHook()
const userName = useStore.username;
let showStting = ref(false)
const handelSetting=()=>{
    showStting.value = true
}
const logOut = ()=>{
    useStore.logout()
}
</script>
<style lang="less" scoped>

.header {
  height: 60px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
}
</style>