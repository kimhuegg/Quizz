import axios from "axios"

export const USER_GET_QUESTION_SUCCESS = 'USER_GET_QUESTION_SUCCESS'
export const ADMIN_GET_QUESTION_SUCCESS = 'ADMIN_GET_QUESTION_SUCCESS'

export const USER_GET_QUESTION_FAIL = 'USER_GET_QUESTION_FAIL'
export const ADMIN_GET_QUESTION_FAIL = 'ADMIN_GET_QUESTION_FAIL'

export const USER_SUBMIT_ANSWER_SUCCESS = 'USER_SUBMIT_ANSWER_SUCCESS'
export const USER_SUBMIT_ANSWER_FAIL = 'USER_SUBMIT_ANSWER_FAIL'

export const ADMIN_CREATE_QUESTION = 'ADMIN_CREATE_QUESTION'

export const userGetQuestions = () => async (dispatch, getState) => {
    try {
        const { data } = await axios.get('/v1/questions/', {
            headers: {
                "Authorization": `Bearer ${getState().user.userInfo.tokens.access.token}`
            }
        })

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
        const { data } = await axios.post(`/v1/questions/submit`, listAnswer, {
            headers: {
                "Authorization": `Bearer ${getState().user.userInfo.tokens.access.token}`
            }
        })
        //   console.log(data)
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
        const { data } = await axios.get('/v1/questions/edit', {
            headers: {
                "Authorization": `Bearer ${getState().user.userInfo.tokens.access.token}`
            }
        })

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
        const { data } = await axios.post(`/v1/questions/edit`, question, {
            headers: {
                "Authorization": `Bearer ${getState().user.userInfo.tokens.access.token}`
            }
        })
        console.log('admin create answer')
        console.log(data)

        dispatch(adminGetQuestions())

    } catch (error) {

    }
}

export const adminDeleteQuestion = (idQuestion) => async (dispatch, getState) => {
    try {
        const { data } = await axios.delete(`/v1/questions/edit/${idQuestion}`, {
            headers: {
                "Authorization": `Bearer ${getState().user.userInfo.tokens.access.token}`
            }
        })
        console.log('admin delete answer')
        console.log(data)
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
        const { data } = await axios.patch(`/v1/questions/edit/${question.id}`, dataQuestion, {
            headers: {
                "Authorization": `Bearer ${getState().user.userInfo.tokens.access.token}`
            }
        })
        console.log(data)
        dispatch(adminGetQuestions())
    } catch (error) {

    }

}