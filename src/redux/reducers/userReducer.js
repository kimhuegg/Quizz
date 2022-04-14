import {
  USER_LOGIN_SUCCESS, 
  USER_LOGOUT_SUCCESS, 
  USER_LOGIN_FAIL, 
  USER_REGISTER_SUCCESS, 
  REFRESH_TOKEN} from '../constants/index'

const initState = {
  userInfo: JSON.parse(localStorage.getItem('userInfo'))
}

export default function userReducer(state = initState, action) {
    switch (action.type) {
      case USER_LOGIN_SUCCESS:
        return {
          userInfo : action.payload
        }
      case USER_LOGIN_FAIL:
        return {
          error : action.payload
        }
        case USER_REGISTER_SUCCESS:
          return {
            registerInfo : action.payload
          }
      case USER_LOGOUT_SUCCESS:
        return {
          userInfo : null
        }
      case REFRESH_TOKEN:
        return {
          userInfo : action.payload
        }
      default:
        return state
    }
  }