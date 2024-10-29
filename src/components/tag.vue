 <template>
    <div class="wrap-tag">
        <span v-bind="props" ref="tag" class="tag"></span>
    </div>
 </template>
 <script lang="ts" setup>

 const tag = ref<HTMLElement>()
 const props = defineProps({

   theme:{
     type:String,
     default:null,
     required:false
   },
   text:{
     type:String,
     default:null,
   }
   
  })
  onMounted(()=>{
    setText() 
    setTheme()
  })
  const setText=()=>{
    tag.value!.innerText = props.text
  }
  const setTheme=()=>{
    tag.value!.style.backgroundColor = props.theme
  }
 </script>
 <style lang="less" scoped>
   .wrap-tag{
    //  display: inline-block;
    margin: 30px;
     .tag{
        background-color: red;
       padding: 2px 8px;
       border-radius: 4px;
       color: #fff;
       font-size: 14px;
       line-height: 1;
       vertical-align: middle;
       white-space: nowrap;
     }
   }
 </style>