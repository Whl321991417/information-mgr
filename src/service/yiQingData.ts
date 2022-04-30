import ApiService from '../request'
export const yiqingdata = async (url: string) => {
    const result = await ApiService.post(url);
    return result.data
}

