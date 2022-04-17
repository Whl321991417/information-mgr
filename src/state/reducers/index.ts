import { combineReducers } from 'redux';
import { areaStateReducer } from './area/areaStateReducer';
import { studentStateReducer } from './student/studentReducer';

const rootReducer = combineReducers({
    areaStateReducer,
    studentStateReducer
})

export default rootReducer