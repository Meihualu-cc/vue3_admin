// import { get } from "@/http/request";

// export const getRoleList =  () => {
//     return get({}, '/getRoleList');
// };
import service from "@/http/request";
export const getRoleList = () => service.get('/getRoleList');