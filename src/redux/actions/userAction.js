import { api_login, api_register, api_refresh_token } from '../../api/index'

import {
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT_SUCCESS,
    USER_LOGOUT_FAIL,
    CLEAR_PRODUCT,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    REFRESH_TOKEN
} from '../constants/index'

export const login = (values) => async (dispatch) => {
    try {
        const { data } = await api_login(values)
        const { user, tokens } = data

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data,
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error
        })
    }
}

export const register = (values) => async (dispatch) => {
    // console.log(values)
    try {
        const { data } = await api_register(values)
        const { user, tokens } = data

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: user,
        })

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
    const { data } = await api_refresh_token(
        {
            "refreshToken": datatoken
        }
    )
    const newInfo = {
        ...userInfo,
        tokens: data
    }
    console.log('new info')
    console.log(newInfo)
    try {
        dispatch({
            type: REFRESH_TOKEN,
            payload: newInfo
        })

        localStorage.setItem('userInfo', JSON.stringify(newInfo))
    } catch (error) {

    }
}