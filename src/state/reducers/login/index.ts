
import { SETISLOGIN, SETUSERSHOWMODAL } from '../../actions';
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
//个人信息界面隐藏状态
export const userStateReducer = (state = initState, action: ActionData) => {
    switch (action.type) {
        case SETUSERSHOWMODAL:
            return {
                ...state,
                userShowModal: action.data
            }
        default:
            return state
    }
}