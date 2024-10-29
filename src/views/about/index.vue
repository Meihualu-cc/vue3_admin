<template>
    <div class="wrap-about">
        <tag text="çćč" theme="pink"></tag>
        <ElForm ref="formRef"  label-width="120px">
        </ElForm>
    </div>
</template>
<script lang="ts" setup>
import{useCompRef} from '@/hooks/usecompRef';
import {ElForm} from 'element-plus';
 
const formRef = useCompRef<typeof ElForm>();
</script> 
<style lang="less">
  .wrap-about{
      color: @color;
      background-color: @bg;
  }
  
</style>