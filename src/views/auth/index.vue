<template>
    <div>
        <el-tree 
        ref="treeRef"
      style="max-width: 600px"
      :data="authList"
      show-checkbox
      :check-strictly="true"
      node-key="roleId"
      :default-checked-keys="checkedNode"
      default-expand-all
      :expand-on-click-node="false"
      :props="{label:'name',children:'roleList' }"
    />
    <el-button type="primary" @click="onChangeAuth">修改权限</el-button>
    </div>
</template>
<script lang="ts" setup>
import {getAuthList} from "@/api/auth"
import {IAuth} from "@/types/common"
let checkedNode = ref<number[]>([])
const  route = useRoute()
const {query} = route
if(query.auth){
    checkedNode.value = query.auth as any
}
                       

const treeRef = ref<any>(null)
const authList = ref<IAuth[]>([])
onMounted(() => {
    fetchAuthList()
})
const fetchAuthList = () => {
    getAuthList({}).then(res => {
        authList.value = res.data
    })
}
const onChangeAuth = () => { 
    const checkNodes = treeRef.value?.getCheckedNodes()
    console.log(checkNodes)
}
</script>
<style scoped>

</style>