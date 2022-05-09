
import { SETISLOGIN } from '../../actions';
import { ActionData } from '../../types';
const initState = {
    isLogin: false,
    userShowModal: false
}

//登录状态
export const loginStateReducer = (state = initState, action: ActionData) => {
    switch (action.type) {
        case SETISLOGIN:
            return {
                ...state,
                isLogin: action.data
            }
        default:
            return state
    }
}
