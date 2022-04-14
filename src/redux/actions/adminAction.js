import {api_admin_getUsers, api_admin_createNewUser} from '../../api/index'

import {
    ADMIN_GET_LIST_USER_FAIL,
    ADMIN_GET_LIST_USER_SUCCESS
} from '../constants/index'

export const getListUser = () => async (dispatch, getState) => {
    try {
        const { data } = await api_admin_getUsers()
     
        dispatch({
            type: ADMIN_GET_LIST_USER_SUCCESS,
            payload: data,
        })

        localStorage.setItem('listUser', JSON.stringify(data))

        // handleTokenExpired(Date.parse(tokens.access.expires), dispatch)

    } catch (error) {
        dispatch({
            type: ADMIN_GET_LIST_USER_FAIL,
            payload: error
        })
    }
}

export const createUser = (userInfo) => async (dispatch, getState) => {
    try {
        const { data } = await api_admin_createNewUser(userInfo)
        console.log(data)

        dispatch(getListUser())

    } catch (error) {
        dispatch({
            type: ADMIN_GET_LIST_USER_FAIL,
            payload: error
        })
    }
}

