import { combineReducers } from 'redux';
import { areaStateReducer } from './area/areaStateReducer';
import { loginStateReducer } from './login';
import { studentStateReducer } from './student/studentReducer';

const rootReducer = combineReducers({
    areaStateReducer,
    studentStateReducer,
    loginStateReducer
})

export default rootReducer