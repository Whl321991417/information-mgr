import { DormitoryType } from "../../../model"
import { GETTABLELIST, HIDEADDDIALOG, SHOWADDDIALOG, UPDATEMENU } from "../../actions"
import { ActionData } from "../../types"

const initState = {
    areaList: [],
    tableData: [],
    addDialogVisible: false,
    addItemNode: {}
}
export const areaStateReducer = (state = initState, action: ActionData) => {
    switch (action.type) {
        case UPDATEMENU:
            return {
                ...state,
                areaList: action.data
            }

        case SHOWADDDIALOG:
            return {
                ...state,
                addDialogVisible: true,
                addItemNode: action.data
            }
        case HIDEADDDIALOG:
            return {
                ...state,
                addDialogVisible: false,
                addItemType: ''
            }
        case GETTABLELIST:
            return {
                ...state,
                tableData: action.data
            }
        default:
            return state
    }
}
