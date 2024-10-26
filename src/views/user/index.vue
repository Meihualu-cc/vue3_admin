<template>
    <div>   
        <!-- inline设置内联属性，让表单在同一行内排列 -->
        <el-form  :inline="true" class="search-form" :model="searchData">
            <el-form-item label="姓名" prop="nickName">
                <el-input v-model="searchData.nickName" placeholder="请输入姓名"/>
            </el-form-item>
            <el-form-item label="角色" prop="role">
                <el-select v-model="searchData.role" placeholder="请选择角色" size="large" style="width: 200px" >
                    <el-option label="全部" value="0" ></el-option>
                    <el-option v-for="item in roleWithAuthList" :key="item.roleId" :label="item.roleName" :value="item.roleId"/>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary"  @click="onSearch" size="small">查询</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="id" label="编号" />
            <el-table-column prop="nickName" label="姓名"  />
            <el-table-column prop="nickName" label="姓名"  >
                <template #default="scope">
                    <el-button v-for="item in scope.row.role" type="primary" :key="item.role" size="small">
                        {{ item.roleName}}
                    </el-button>    
                </template>
            </el-table-column>
            <el-table-column prop="role" label="操作"    >
                <template #default="scope">
                    <el-button  type="primary"  size="small">
                       编辑
                    </el-button>
                </template>
            </el-table-column>
    </el-table>
    </div>
</template>
<script lang="ts" setup>    
import {onMounted, reactive, ref,watch} from 'vue'
import { getUserList } from '@/api/user';
import {getRoleList} from '@/api/role'
interface IRole{
    role:number;
    roleName: string;
}
interface IUser{
    id:number;
    userName:string;
    nickName: string;
    role: IRole[];
}
interface IRoleWithAuth{
    roleId:number;
    roleName: string;
    auth:number[];
}
interface IQueryUser{
    nickName:string;
    role:number;
}
const roleWithAuthList = ref<IRoleWithAuth[]>([])
const searchData = reactive<IQueryUser>({
    nickName:'',
    role:0
})

const tableData = ref<IUser[]>([])

onMounted(()=>{
    fetchUserList()
    fetchRoleList()
})
watch([()=>searchData.nickName,()=>searchData.role],()=>{
    if(Number(searchData.role)===0||!searchData.nickName){
    fetchUserList()}
})
const fetchRoleList = async () =>{
    const res = await getRoleList()
    roleWithAuthList.value = res.data
}
const fetchUserList = async () =>{
    const res = await getUserList()
    tableData.value = res.data
}
const onSearch=()=>{
    let res : IUser[]=[]
    console.log('过滤前',tableData.value)
    if(searchData.nickName||searchData.role){
        if(searchData.nickName){
            res=tableData.value.filter((value)=>{
                return value.nickName.indexOf(searchData.nickName)!==-1
            })
        }
       if(searchData.role){
         console.log('searchData.role:',typeof searchData.role,searchData.role,searchData.nickName,!searchData.nickName)
         res=searchData.nickName?res:tableData.value
            res=Number(searchData.role)===0?res:res.filter((item)=>{
                return item.role.find(value=>value.role===searchData.role)
            })
        }
    }else{
        res=tableData.value
    }
    tableData.value = res
}
</script>

<style scoped>

</style>