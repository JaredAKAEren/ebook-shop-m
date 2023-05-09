<template>
    <HeadNav>
        <template #title>{{ title }}</template>
    </HeadNav>
    <main class="bg-sh-gray min-h-screen pt-12">
        <van-address-edit :area-list="areaList"
            :address-info="addressInfo"
            show-delete
            show-set-default
            :area-columns-placeholder="['请选择', '请选择', '请选择']"
            @save="onSave"
            @delete="onDelete" />
    </main>
</template>

<script setup>
import HeadNav from '@/components/GlobalParts/HeadNav.vue'
import { areaList } from '@vant/area-data'

import { showToast } from 'vant'
import { addAddress, updateAddress, getAddressDetail } from '../../api/AddressView'

import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const addressInfo = ref({
    name: '',
    tel: '',
    province: '',
    city: '',
    county: '',
    addressDetail: '',
    areaCode: '',
    isDefault: false,
})
const title = computed(() => {
    return route.query.id ? '修改地址' : '新增地址'
})

onMounted(() => {
    if (route.query.id) {
        getAddressDetail(route.query.id).then(res => {
            addressInfo.value.name = res.name
            addressInfo.value.tel = res.phone
            addressInfo.value.province = res.province
            addressInfo.value.city = res.city
            addressInfo.value.county = res.county
            addressInfo.value.addressDetail = res.address
            addressInfo.value.areaCode = getCountyKey(res.province, res.city, res.county)
            addressInfo.value.isDefault = !!res.is_default ? true : false
        }).catch(err => {
            console.log(err.message)
        })
    }
})

function onSave(info) {
    if (route.query.id) {
        updateAddress(route.query.id, info).then(res => {
            if (res === '') {
                showToast('更新成功')
            }
        }).catch(err => {
            console.log(err.message)
        })
    } else {
        addAddress(info).then(res => {
            if (res === '') {
                showToast('保存成功')
            }
        }).catch(err => {
            console.log(err.message)
        })
    }
}

function onDelete(info) {
    console.log(info)
    showToast('删除成功')
}

function getCountyKey(province_value, city_value, county_value) {
    let province_key = Object.keys(areaList.province_list).find(key => areaList.province_list[key] === province_value)
    let city_key = Object.keys(areaList.city_list).find(key => areaList.city_list[key] === city_value && key.startsWith(province_key.slice(0, 2)))
    let county_key = Object.keys(areaList.county_list).find(key => areaList.county_list[key] === county_value && key.startsWith(city_key.slice(0, 4)))
    return county_key
}
</script>
