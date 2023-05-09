import http from '../http'

export const getOrderPreview = () => {
    return http.get('/orders/preview')
}

export const createOrder = (id) => {
    return http.post('/orders', { address_id: id })
}

export const getPayQRCode = (id, type) => {
    return http.get(`/orders/${id}/pay?type=aliyun${type}`)
}

export const updateOrderStatusToPaid = (id, type) => {
    return http.patch(`/orders/${id}/paytest?type=${type}`)
}

export const getOrders = (status,page) => {
    return http.get('/orders', {
        params: {
            include: 'orderDetails.goods',
            status,
            page
        }
    })
}

export const getOrder = (id) => {
    return http.get(`/orders/${id}`, {
        params: {
            include: 'orderDetails.goods,address'
        }
    })
}