import axios from 'axios'
import { handleTokenExpired } from '../../ultis/token'

export const ADMIN_GET_LIST_USER_SUCCESS = 'ADMIN_GET_LIST_USER_SUCCESS'
export const ADMIN_GET_LIST_USER_FAIL = 'ADMIN_GET_LIST_USER_FAIL'

export const getListUser = () => async (dispatch, getState) => {
    try {
        const { data } = await axios.get('/v1/users/', {
            headers: {
                "Authorization": `Bearer ${getState().user.userInfo.tokens.access.token}`
            }
        })

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
        const { data } = await axios.post('/v1/users/', userInfo,  {
            headers: {
                "Authorization": `Bearer ${getState().user.userInfo.tokens.access.token}`
            }
        })
        console.log(data)

        dispatch(getListUser())

    } catch (error) {
        dispatch({
            type: ADMIN_GET_LIST_USER_FAIL,
            payload: error
        })
    }
}

