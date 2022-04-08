import ApiService from '../request'
export const collegeIfo = (url: string, param: any) => {
    const result = ApiService.get(url, param);
    return result;
}