import ApiService from '../request'

//const DATA_URL ='https://api.inews.qq.com/newsqa/v1/query/inner/publish/modules/list?modules=statisGradeCityDetail,diseaseh5Shelf'
export const login = async (url: string, param: any) => {
    const result = await ApiService.post(url, param);
    return result.data
}