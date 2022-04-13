
import axios from "axios";

const API = axios.create({
    baseURL: "https://fwa-ec-quiz.herokuapp.com/",
});

API.interceptors.request.use((req) => {
    // Do something before request is sent
    const userToken = JSON.parse(localStorage.getItem("userInfo"))?.tokens.access.token;
    // console.log(userToken)
    if (userToken) {
        req.headers.Authorization = `Bearer ${userToken}`;
    }
    return req;
});

export const api_login = (userInfo) =>
    API.post(`/v1/auth/login`, userInfo);

export const api_register = (userInfo) => {
    return API.post(`/v1/auth/register`, userInfo);
};
export const api_getQuestions = () =>
    API.get(`/v1/questions?page=1&limit=100`);

export const api_submitQuestions = (userAnswers) =>
    API.post(`/v1/questions/submit`, userAnswers);

export const api_admin_getQuestions = () =>
    API.get(`/v1/questions/edit`);

export const api_admin_deleteQuestions = (quesId) =>
    API.delete(`/v1/questions/edit/${quesId}`);

export const api_admin_createNewQues = (obj) =>
    API.post(`/v1/questions/edit`, obj);

export const api_admin_updateQues = (id, obj) =>
    API.patch(`/v1/questions/edit/${id}`, obj);

export const api_admin_getUsers = () =>
    API.get(`/v1/users/`);

export const api_admin_createNewUser = (obj) =>
    API.post(`/v1/users/`, obj);

export const api_admin_updateUser = (id, userInfo) =>
    API.patch(`/v1/users/${id}`, userInfo);



