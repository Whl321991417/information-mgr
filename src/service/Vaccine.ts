import ApiService from '../request'
export const vaccine = async (url: string) => {
    const result = await ApiService.get(url);
    return result.list
}
export const addVaccineIfo = (url: string, param: any) => {
    const result = ApiService.post(url, param);
    return result;
}
export const delVaccineIfo = (url: string, param: any) => {
    const result = ApiService.delete(url, param);
    return result;
}