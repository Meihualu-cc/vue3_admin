<template>
    <div class="wrap-content">
      <el-form :inline="true" label="名称" :model="searchData" class="search-form">
            <el-form-item>
                <el-input v-model="searchData.title" placeholder="请输入名称"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input v-model="searchData.introduce" placeholder="请输入详情"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSearchGoods()">查询</el-button>
            </el-form-item>
        </el-form>
      <el-table :data="currentList" style="width: 100%">
    <el-table-column prop="id" label="序号" width="180" />
    <el-table-column prop="title" label="标题" width="180" />
    <el-table-column prop="introduce" label="项目介绍" />
  </el-table>
  <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[10, 20, 30, 40]"
      :size="size"
      layout="prev, pager,total, next, sizes"
      :total=" searchData.dataCount"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    </div>
  </template>
  <script lang="ts" setup>
 import { getProjectList } from '@/api/project';
 import type { ComponentSize } from 'element-plus'
 let currentPage = ref(1)
 let pageSize = ref(10)
 const size = ref<ComponentSize>('default')

 // 项目接口
interface IProject {
    userId: number; // 项目
    id: number; // 项目id
    title: string; // 项目标题
    introduce: string; // 项目介绍
}
let projectList = ref<IProject[]>([])
let searchData = reactive({
    userId: 0,
    id: 0,
    title: '',
    introduce: '',
    currentPage: 1,
    dataCount: 0,
    pageSize: 10
});
// 计算属性, 切割出实际上需要展示的数据
let currentList = computed(() => {
  if(searchData.title||searchData.introduce){
    return searchList.value.slice(
        (searchData.currentPage - 1) * searchData.pageSize,
        searchData.currentPage * searchData.pageSize
    );
  }else{
    return projectList.value.slice(
        (searchData.currentPage - 1) * searchData.pageSize,
        searchData.currentPage * searchData.pageSize
    );
  }
   
});
let searchList = ref<IProject[]>([])

const handleSizeChange=(pageSize:number)=>{
  searchData.pageSize = pageSize
}
const handleCurrentChange=(currentPage:number)=>{
  searchData.currentPage = currentPage
}
// 查询商品列表
const onSearchGoods = () => {
    console.log(projectList.value);
    let res: IProject[] = [];
    if (searchData.title || searchData.introduce) {
        if (searchData.title&&!searchData.introduce) {
            res = projectList.value.filter((value) => {
                return value.title.indexOf(searchData.title) !== -1;
            });
        }
        if (!searchData.introduce&&searchData.introduce) {
            res = projectList.value.filter((value) => {
                return value.introduce.indexOf(searchData.introduce) !== -1;
            });
        }
        if(searchData.introduce&&searchData.introduce){
          res = projectList.value.filter((item)=>{
            return item.title.indexOf(searchData.title) !==-1 &&item.introduce.indexOf(searchData.introduce)!==-1
          }
        )
        }
    } else {
        console.log(projectList.value);
        res = projectList.value;
    }
    searchList.value = res;
    searchData.currentPage = 1;
    searchData.dataCount = searchList.value.length;
};
// 解决搜索的问题
watch([() => searchData.title, () => searchData.introduce], () => {
    if (!searchData.title && !searchData.introduce) {
      getList();
    }
});

 onMounted(() =>{
   getList()
 })
 const getList=async()=>{
  getProjectList({}).then(res=>{
    projectList.value=res.data
    searchData.dataCount = projectList.value.length
    console.log(' mock接口获取列表',projectList.value)
  })
 }
</script>
  <style lang="less" scoped></style>