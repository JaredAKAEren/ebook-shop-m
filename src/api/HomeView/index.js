import http from "../http"

export const getHomeData = () => {
    return http.get('/index')
}

export const getHomeBooks = (order = 'sales', page = 1) => {
    return http.get(`/index?${order}=1&page=${page}`)
}