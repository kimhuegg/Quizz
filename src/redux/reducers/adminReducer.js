import {
    ADMIN_GET_LIST_USER_FAIL,
    ADMIN_GET_LIST_USER_SUCCESS
} from '../constants/index'

const initState = {
    listUser: JSON.parse(localStorage.getItem('listUser'))
}

export default function userReducer(state = initState, action) {
    switch (action.type) {
        case ADMIN_GET_LIST_USER_SUCCESS:
            return {
                listUser: action.payload
            }
        case ADMIN_GET_LIST_USER_FAIL:
            return {
                error: action.payload
            }

        default:
            return state
    }
}