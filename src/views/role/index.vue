<template>
    <div>
      <el-form>
        <el-form-item >
          <el-button type="primary" @click="onAddRole">新增角色</el-button>
        </el-form-item>
      </el-form>
       <el-table :data="roleList" style="width: 100%;">
        <el-table-column prop="roleId" label="角色编号" />
        <el-table-column prop="roleName" label="角色名称"  />
        <el-table-column label="操作">
           <template #default="scope">
             <el-button type="primary" size="small" @click="onchangeAuth(scope.row)">修改权限</el-button>
           </template>
        </el-table-column>
       </el-table>
       
    </div>
  </template>
  <script lang="ts" setup>
import { getRoleList } from '@/api/role';
import{IRoleTree} from "@/types/common"
const router = useRouter()

const roleList = ref<IRoleTree[]>([])

  onMounted(() => {
    fetchRoleList();
  })
  const fetchRoleList = () => {
    getRoleList().then((res) => {
      roleList.value = res.data;
    });
  };
const onchangeAuth  = (row:IRoleTree) => {
  router.push({
    path:'/auth',
    query:{
      roleId:row.roleId,
      auth: row.authority  
    }
  })
  console.log(row)
}
const onAddRole = () => {
  ElMessageBox.prompt('请输入角色名称', '添加角色',{
    confirmButtonText: '确定',
    cancelButtonText: '取消'
  })
  .then(({value,action}) => {
    if(value){
      roleList.value.push({
        roleId:roleList.value.length+1,
        roleName:value,
        authority:[]
      })
      ElMessage({
        type:'success',
        message:`${value}添加成功`
      })
      console.log(roleList.value);    
    }
    console.log(value);
  }).catch(() => {
    ElMessage({
        type:'info',
        message:'取消添加'
      })
  });
}
</script>
  <style lang="less" scoped></style>