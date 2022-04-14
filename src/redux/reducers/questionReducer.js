import {
    
    USER_GET_QUESTION_FAIL,
    USER_GET_QUESTION_SUCCESS,
    USER_SUBMIT_ANSWER_FAIL,
    USER_SUBMIT_ANSWER_SUCCESS,
    ADMIN_GET_QUESTION_SUCCESS,
    ADMIN_GET_QUESTION_FAIL,
} from '../constants/index'

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
        default:
            return state
    }
}