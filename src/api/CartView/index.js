import http from '../http'

export const addToCartList = (id) => {
    return http.post('/carts', { goods_id: id })
}

export const getCartList = () => {
    return http.get('/carts')
}

export const getCartListWithBooks = () => {
    return http.get('/carts?include=goods')
}

export const removeBookFromCart = (id) => {
    return http.delete('/carts/' + id)
}

export const updateCartNum = (id, num) => {
    return http.put('/carts/' + id, { num })
}

export const updateCartChecked = (checkedList = []) => {
    return http.patch('/carts/checked', { cart_ids: checkedList })
}