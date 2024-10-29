export interface IRole{
    role:number;
    roleName: string;
}
export interface IUser{
    id:number;
    userName:string;
    nickName: string;
    role: IRole[];
}
export interface IRoleWithAuth{
    roleId:number;
    roleName: string;
    auth:number[];
}
export interface IQueryUser{
    nickName:string;
    role:number;
}
export interface IEditUser{
    id:number;
    nickName:string;
    role:number[];
}
export interface IRoleTree {
    roleId:number;
    roleName:string; 
    authority:any[];
  }
 // 项目接口
 export interface IProject {
    userId: number; // 项目
    id: number; // 项目id
    title: string; // 项目标题
    introduce: string; // 项目介绍
}
export interface IAuth{
    name:string;
    roleId:number;
    viewRole:string;
    roleList:IAuth[]
}