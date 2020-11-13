import { combineReducers } from 'redux';
import auth from './auth';
import CRUD from './CRUD';

const rootReducer = combineReducers({
    auth,
    CRUD,
})

export default rootReducer;