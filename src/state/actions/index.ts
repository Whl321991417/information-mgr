import { createArea, getAreaList } from "../../service/area";

export const UPDATEMENU = 'UPDATEMENU'; //更新左侧树

export const SHOWADDDIALOG = 'SHOWADDDIALOG'; //展示新建弹窗
export const HIDEADDDIALOG = 'HIDEADDDIALOG'; //隐藏新建弹窗


// 获取区域列表
const updateTreeAction = (data: any) => ({
    type: UPDATEMENU,
    data
})

// 先通过dispath发起一个异步， react-thuunk 处理异步拿到 responseData 以后 发起一个同步dispath 更改state
export const getMenuTree = () => async (dispatch: (payload: { type: string; data: any; }) => void) => {
    const data = await getAreaList('/api/dormitory', {})
    dispatch(updateTreeAction(data));
}

export const showAddDialog = {
    type: SHOWADDDIALOG
}


export const hideAddDialog = {
    type: HIDEADDDIALOG
}

export const addMenuTree = (params: any) => async (dispatch: any) => {
    await createArea('/api/dormitory', params)
    dispatch(getMenuTree())
}