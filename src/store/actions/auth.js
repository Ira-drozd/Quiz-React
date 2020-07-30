import axios from "axios";
import {AUTH_LOGOUT, AUTH_SUCCESS} from "./actionTypes";

export const authSuccess = token => ({
    type: AUTH_SUCCESS,
    token
})

export const auth = (email, password, isLogin) => async (dispatch, getState) => {

    const authData = {
        email,
        password,
        returnSecureToken: true
    }

    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCGTj8BdQrD8tAzNpt4BAm_mi7YY43FV8A'

    if (isLogin) {
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCGTj8BdQrD8tAzNpt4BAm_mi7YY43FV8A'
    }

    const response = await axios.post(url, authData)
    const data = response.data

    const expirationData = new Date(new Date().getTime() + data.expiresIn * 1000)

    localStorage.setItem('token', data.idToken)
    localStorage.setItem('userId', data.localId)
    localStorage.setItem('expirationData', expirationData)

    dispatch(authSuccess(data.idToken))
    dispatch(autoLogout(data.expiresIn))
}

export const autoLogout = token => dispatch => {
    setTimeout(() => dispatch(logout()), token * 1000)
}

export const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('expirationData')
    return {
        type: AUTH_LOGOUT
    }

}

export const autoLogin = () => dispatch => {
    const token = localStorage.getItem('token')
    if (!token) {
        dispatch(logout())
    } else {
        const expirationData = new Date(localStorage.getItem('expirationData'))
        if (expirationData <= new Date()) {
            dispatch(logout())
        } else {
            dispatch(authSuccess(token))
            dispatch(autoLogout((expirationData.getTime() - new Date().getTime()) / 1000))
        }
    }
}