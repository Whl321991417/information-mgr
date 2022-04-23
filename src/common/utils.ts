import { TreeNodeItem } from "../model"

export const debounce = (fc: (...arg: any) => void, time: number) => {
    let timer: any = null
    return (...arg: any) => {
        if (timer) {
            clearTimeout(timer)
            timer = null
            timer = setTimeout(() => {
                fc(...arg)
                clearTimeout(timer)
                timer = null
            }, time);
            return
        }
        timer = setTimeout(() => {
            fc(...arg)
            clearTimeout(timer)
            timer = null
        }, time);
    }
}
export function getTreePath(pos: string, dataList: TreeNodeItem[]) {
    // 0-1-0 

    const posArr = pos.split("-");
    const path: string[] = ['区域管理']
 
    // [1,0]
    posArr.slice(1).reduce((total, currentValue) => {
        path.push(total[+currentValue].name)
        return dataList[+currentValue].children
    }, dataList)
    return path
}