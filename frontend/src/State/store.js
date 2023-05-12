import  { createStore,combineReducers,applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import  { composeWithDevTools } from 'redux-devtools-extension'
import { userSignInReducer, usersReducer } from './Reducers/UserReducer'
import { modeReducer } from './Reducers/ModeReducer'
import { postsReducer } from './Reducers/PostReducer'
import { FilterSearch } from './Reducers/SearchReducer'
import { adminDReducer } from './Reducers/AdminReducer'


const reducers = combineReducers({
    darkMode : modeReducer,
    auth : userSignInReducer,
    posts : postsReducer,
    users: usersReducer,
    admin: adminDReducer,
    searchResult: FilterSearch
})

const userFromStorage = localStorage.getItem('user') ?
JSON.parse(localStorage.getItem('user')) : null

const initialState = {
   darkMode:'light',
   auth : userFromStorage,
   
}




const store = createStore(reducers,initialState,composeWithDevTools(applyMiddleware(thunk)))


export default store