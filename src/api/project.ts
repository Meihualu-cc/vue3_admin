// import { get } from '@/http/request';

// export const getProjectList =  (data) => {
//     return get({}, '/projects', data);
// };

import service from "@/http/request";
export const getProjectList = (data) => {
    return service({
        url:'/projects',
        method:'get',
        data
    })
};
