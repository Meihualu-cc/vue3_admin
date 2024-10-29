import {ref} from 'vue'
//T extends  new (...args:any) =>any 这个泛型约束表明T必须是一个抽象类（或至少是一个类）的构造函数，它接受任意数量的参数并返回任意类型的实例
export function useCompRef<T extends  new (...args:any) =>any>(){
    return ref<InstanceType<T> >()
} 