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
                    <el-button  type="primary"  size="small" @click=handelEditUser(scope.row)>
                       编辑
                    </el-button>
                </template>
            </el-table-column>
    </el-table>
    <!-- <el-dialog -->
    <el-dialog v-model="editShow" title="编辑用户信息 ">
        <el-form :model="editUser">
            <el-form-item label="用户昵称" label-width="120px">
                <el-input v-model="editUser.nickName" autocomplete="off"></el-input>
            </el-form-item> 
            <el-form-item label="用户角色" label-width="120px">
                <el-select v-model="editUser.role" multiple placeholder="请选择用户角色">
                    <el-option 
                    v-for="item in roleWithAuthList" 
                    :key="item.roleId" 
                    :label="item.roleName"
                    :value="item.roleId"/>
                </el-select>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="editShow=false">取 消</el-button>
                <el-button @click="ensureEditUser" type="primary">确定</el-button>
            </span>
        </template>
    </el-dialog>
    </div>
</template>
<script lang="ts" setup>    
import { getUserList } from '@/api/user';
import {getRoleList} from '@/api/role'
import {IEditUser,IRoleWithAuth,IQueryUser,IUser} from '@/types/common'
const editShow= ref(false)
const editUser = reactive<IEditUser>({
    id:0, 
    nickName:'',
    role:[]
})
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
const handelEditUser=(row:IUser)=>{
    editShow.value=true
    //editUser不能直接赋值要saading一个新对象
    Object.assign(editUser,{
        ...row,
        role:row.role.map((value)=>value.role) //因为role为引用类型不能直接赋值，要map一下
    })
}
const ensureEditUser=()=>{ 
    editShow.value=false
    let obj:IUser = tableData.value.find((item)=>item.id===editUser.id)||<IUser>{};
    obj.nickName=editUser.nickName;
    obj.role=[]
   roleWithAuthList.value.forEach((item)=>{
    if(editUser.role.includes(item.roleId)){
        obj.role.push({
            role:item.roleId,
            roleName:item.roleName
        })
    }
   })
}
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