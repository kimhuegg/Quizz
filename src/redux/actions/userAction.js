import axios from 'axios'
import {handleTokenExpired} from '../../ultis/token'

export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS'
export const USER_LOGIN_FAIL = 'USER_LOGIN_FAIL'
export const USER_LOGOUT_SUCCESS = 'USER_LOGOUT_SUCCESS'
export const USER_LOGOUT_FAIL = 'USER_LOGOUT_FAIL'
export const CLEAR_USER = 'CLEAR_USER'

export const USER_UPDATE_NEW_TOKEN_SUCCESS = 'USER_UPDATE_NEW_TOKEN_SUCCESS'
export const USER_UPDATE_NEW_TOKEN_FAIL = 'USER_UPDATE_NEW_TOKEN_FAIL'
export const USER_REGISTER_SUCCESS = 'USER_REGISTER_SUCCESS'
export const USER_REGISTER_FAIL = 'USER_REGISTER_FAIL'
export const CLEAR_PRODUCT = 'CLEAR_PRODUCT'

export const REFRESH_TOKEN = 'REFRESH_TOKEN'

export const login = (values) => async (dispatch) => {
    try {
        const {data } = await axios.post('/v1/auth/login', values)
        const {user, tokens} = data
        
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data,
        })

        localStorage.setItem('userInfo', JSON.stringify(data))
        
        // handleTokenExpired(tokens.access, dispatch, tokens.refresh)

        
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error
        })
    }
}

export const register = (values) => async (dispatch) => {
    console.log(values)
    try {
        const {data} = await axios.post('/v1/auth/register', values)
        console.log({})
        const {user, tokens} = data
        

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload : user,
        })

        // localStorage.setItem('userInfo', JSON.stringify(data))
        // handleTokenExpired(data.user.tokens.access.expires)
        
    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error
        })
    }
}

export const logout = () => async (dispatch) => {
    try {
        // const {data} = await axios.post('https://fwa-ec-quiz.herokuapp.com/v1/auth/register', values)

        dispatch({
            type: USER_LOGOUT_SUCCESS,
        })
        dispatch({
            type: CLEAR_PRODUCT,
        })

        localStorage.clear()
        // handleTokenExpired(data.user.tokens.access.expires)
        
    } catch (error) {
        dispatch({
            type: USER_LOGOUT_FAIL,
            payload: error
        })
    }
}

export const refreshToken = (datatoken) => async (dispatch, getState) => {
    console.log('refresh token')
    const state = getState()
    const userInfo = state.user.userInfo
    console.log(userInfo)

    const {data} = await axios.post('/v1/auth/refresh-tokens', {
      "refreshToken": datatoken
    })
    const newInfo = {
        ...userInfo,
        tokens : data
    }
    console.log('new info')
    console.log(newInfo)
    try {
        dispatch({
            type : REFRESH_TOKEN, 
            payload : newInfo
        })

        localStorage.setItem('userInfo', JSON.stringify(newInfo))
    } catch (error) {
        
    }
}