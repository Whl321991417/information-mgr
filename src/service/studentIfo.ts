import ApiService from '../request'
export const studentIfo = (url: string, param?: any) => {
    const result = ApiService.get(url, param);
    return result;
}
export const addStudentIfo = (url: string, param: any) => {
    const result = ApiService.post(url, param);
    return result;
}
export const delStudentIfo = (url: string, param: any) => {
    const result = ApiService.delete(url, param);
    return result;
}
