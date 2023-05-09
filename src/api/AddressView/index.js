import http from '../http'

export const addAddress = (info) => {
    return http.post('/address', {
        name: info.name,
        address: info.addressDetail,
        phone: info.tel,
        province: info.province,
        city: info.city,
        county: info.county,
        is_default: info.isDefault ? 1 : 0
    })
}

export const updateAddress = (id, info) => {
    return http.put(`/address/${id}`, {
        name: info.name,
        address: info.addressDetail,
        phone: info.tel,
        province: info.province,
        city: info.city,
        county: info.county,
        is_default: info.isDefault ? 1 : 0,
    })
}

export const getAddressList = () => {
    return http.get('/address')
}

export const getAddressDetail = (id) => {
    return http.get(`/address/${id}`)
}