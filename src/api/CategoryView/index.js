import http from "../http"

export const getCategoryData = () => {
    return http.get('/goods')
}

export const getBooksByCategory = (order = 'sales', id, page = 1) => {
    return http.get(`/goods?${order}=1&category_id=${id}&page=${page}`)
}