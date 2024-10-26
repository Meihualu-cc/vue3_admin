import { get } from "@/http/request";

export const getRoleList =  () => {
    return get({}, '/getRoleList');
};