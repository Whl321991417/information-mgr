import ApiService from '../request'
export const login = async (url: string, param: any) => {
    const result = await ApiService.post(url, param);
    return result.token
}