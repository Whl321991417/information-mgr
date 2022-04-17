import { GETTABLELIST, HIDEADDDIALOG, SHOWADDDIALOG, UPDATEMENU } from "../../actions"
import { ActionData } from "../../types"

const initState = {
    areaList: [],
    tableData: [],
    addDialogVisible: false
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
                addDialogVisible: true
            }
        case HIDEADDDIALOG:
            return {
                ...state,
                addDialogVisible: false
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
