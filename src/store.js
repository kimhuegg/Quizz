import { combineReducers, applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import questionReducer from './redux/reducers/questionReducer';
import userReducer from './redux/reducers/userReducer'
import adminReducer from './redux/reducers/adminReducer'

const rootReducer = combineReducers({
    user : userReducer,
    question : questionReducer ,
    admin : adminReducer
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

export default store;
