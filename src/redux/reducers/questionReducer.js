import {
    ADMIN_CREATE_QUESTION,
    USER_GET_QUESTION_FAIL,
    USER_GET_QUESTION_SUCCESS,
    USER_SUBMIT_ANSWER_FAIL,
    USER_SUBMIT_ANSWER_SUCCESS
} from '../actions/questionAction'
import { ADMIN_GET_QUESTION_SUCCESS, ADMIN_GET_QUESTION_FAIL } from '../actions/questionAction'


import { CLEAR_PRODUCT } from '../actions/userAction'

const initState = {
    listQuestions: JSON.parse(localStorage.getItem('questionInfo'))
}
export default function questionReducer(state = initState, action) {
    switch (action.type) {
        case USER_GET_QUESTION_SUCCESS:
            return {
                listQuestions: action.payload
            }
        case USER_GET_QUESTION_FAIL:
            return {
                error: action.payload
            }
        case USER_SUBMIT_ANSWER_SUCCESS:
            return {
                ...state,
                score: action.payload
            }
        case USER_SUBMIT_ANSWER_FAIL:
            return {
            }
        case ADMIN_GET_QUESTION_SUCCESS:
            return {
                listQuestions: action.payload
            }
        case ADMIN_GET_QUESTION_FAIL:
            return {
                error: action.payload
            }
        case ADMIN_CREATE_QUESTION:
            return {
                ...state
            }
        case CLEAR_PRODUCT:
            return null
        default:
            return state
    }
}