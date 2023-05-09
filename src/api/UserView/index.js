import http from '../http'

export const register = (userData) => {
    return http.post('/auth/register', {
        name: userData.username,
        email: userData.email,
        password: userData.password,
        password_confirmation: userData.comfirmPwd,
    })
}

export const login = (userData) => {
    return http.post('/auth/login', {
        email: userData.email,
        password: userData.password,
    })
}

export const logout = () => {
    return http.post('/auth/logout')
}

export const getUserInfo = () => {
    return http.get('/user')
}