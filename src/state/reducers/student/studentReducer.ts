
import { UPDATEMENU } from '../../actions';
import { ActionData } from '../../types';
const initState = {
    studentList: []
}
export const studentStateReducer = (state = initState, action: ActionData) => {

    switch (action.type) {
        case UPDATEMENU:
            return {
                ...state,
                areaList: action.data
            }
        default:
            return state
    }
}

