import http from '../http'

export const getBookDetil = (id) => {
    return http.get(`/goods/${id}`)
}