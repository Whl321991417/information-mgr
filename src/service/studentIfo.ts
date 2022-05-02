import ApiService from '../request'
export const studentIfo = (url: string, param?: any) => {
    const result = ApiService.get(url, param);
    return result;
}