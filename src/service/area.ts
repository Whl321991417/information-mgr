import ApiService from '../request'
export const getAreaList = async (url: string, param: any) => {
    const result = await ApiService.get(url, param);
    return result.data
}
export const createArea = async (url: string, param: any) => {
    const result = await ApiService.post(url, param);
    return result.data
}
export const deleteItem = async (url: string) => {
    const result = await ApiService.delete(url, {});
    return result.data
}
