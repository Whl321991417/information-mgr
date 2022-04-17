import { HIDEADDDIALOG, SHOWADDDIALOG, UPDATEMENU } from "../../actions"
import { ActionData } from "../../types"

const initState = {
    areaList: [],
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
        default:
            return state
    }
}
