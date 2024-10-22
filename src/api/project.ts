import { get } from '@/http/request';

export const getProjectList =  (data) => {
    return get({}, '/projects', data);
};
