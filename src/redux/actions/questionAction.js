import axios from "axios"
import { 
    api_getQuestions, 
    api_submitQuestions,
    api_admin_getQuestions,
    api_admin_deleteQuestions,
    api_admin_createNewQues,
    api_admin_updateQues,

 } from "../../api"

export const USER_GET_QUESTION_SUCCESS = 'USER_GET_QUESTION_SUCCESS'
export const ADMIN_GET_QUESTION_SUCCESS = 'ADMIN_GET_QUESTION_SUCCESS'

export const USER_GET_QUESTION_FAIL = 'USER_GET_QUESTION_FAIL'
export const ADMIN_GET_QUESTION_FAIL = 'ADMIN_GET_QUESTION_FAIL'

export const USER_SUBMIT_ANSWER_SUCCESS = 'USER_SUBMIT_ANSWER_SUCCESS'
export const USER_SUBMIT_ANSWER_FAIL = 'USER_SUBMIT_ANSWER_FAIL'

export const ADMIN_CREATE_QUESTION = 'ADMIN_CREATE_QUESTION'

export const userGetQuestions = () => async (dispatch, getState) => {
    try {
        const { data } = await api_getQuestions()

        dispatch({
            type: USER_GET_QUESTION_SUCCESS,
            payload: data,
        })

        localStorage.setItem('questionInfo', JSON.stringify(data))
        // handleTokenExpired(data.user.tokens.access.expires)

    } catch (error) {
        dispatch({
            type: USER_GET_QUESTION_FAIL,
            payload: error
        })
    }
}

export const userSubmitAnswer = (listAnswer) => async (dispatch, getState) => {
    try {
        const { data } = await api_submitQuestions(listAnswer)

        dispatch({
            type: USER_SUBMIT_ANSWER_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: USER_SUBMIT_ANSWER_FAIL,
        })
    }
}

export const adminGetQuestions = () => async (dispatch, getState) => {
    try {
        const { data } = await api_admin_getQuestions()

        dispatch({
            type: ADMIN_GET_QUESTION_SUCCESS,
            payload: data,
        })

        localStorage.setItem('questionInfo', JSON.stringify(data))
        // handleTokenExpired(data.user.tokens.access.expires)

    } catch (error) {
        dispatch({
            type: ADMIN_GET_QUESTION_FAIL,
            payload: error
        })
    }
}

export const adminCreateQuestion = (question) => async (dispatch, getState) => {
    try {
        const { data } = await api_admin_createNewQues(question) 

        dispatch(adminGetQuestions())

    } catch (error) {

    }
}

export const adminDeleteQuestion = (idQuestion) => async (dispatch, getState) => {
    try {
        const { data } = await api_admin_deleteQuestions(idQuestion)
        dispatch(adminGetQuestions())
    } catch (error) {

    }

}

export const adminUpdateQuestion = (question) => async (dispatch, getState) => {
    try {
        console.log('update question')
        console.log(question)
        const dataQuestion = {
            answer1: question.answer1,
            answer2: question.answer2,
            answer3: question.answer3,
            answer4: question.answer4,
            correctanswer: question.correctanswer,
            question: question.question
        }
        const { data } = await api_admin_updateQues(question.id, dataQuestion) 
        dispatch(adminGetQuestions())
    } catch (error) {

    }

}