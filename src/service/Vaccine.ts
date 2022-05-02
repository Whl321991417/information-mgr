import ApiService from '../request'
export const vaccine = async (url: string) => {
    const result = await ApiService.get(url);
    return result.list
}