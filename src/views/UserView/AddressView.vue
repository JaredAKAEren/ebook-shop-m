<template>
    <HeadNav>
        <template #title>地址管理</template>
    </HeadNav>
    <main class="bg-sh-gray min-h-screen pt-12">
        <van-address-list v-model="chosenAddressId"
            :list="addressList"
            default-tag-text="默认"
            @add="onAdd"
            @edit="onEdit" />
    </main>
</template>

<script setup>
import HeadNav from '@/components/GlobalParts/HeadNav.vue'

import { getAddressList } from '../../api/AddressView'

import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const chosenAddressId = ref('1')
const addressList = ref([
    {
        id: '1',
        name: '张三',
        tel: '13000000000',
        address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室',
        isDefault: true,
    },
    {
        id: '2',
        name: '李四',
        tel: '1310000000',
        address: '浙江省杭州市拱墅区莫干山路 50 号',
    },
])

onMounted(() => {
    getAddressList().then(res => {
        addressList.value = res.data.map(item => {
            return {
                id: item.id,
                name: item.name,
                tel: item.phone,
                address: `${item.province} ${item.city} ${item.county} ${item.address}`,
                isDefault: !!item.is_default ? true : false
            }
        })
        chosenAddressId.value = addressList.value.find(item => item.isDefault).id
    }).catch(err => {
        console.log(err.message)
    })
})

function onAdd() {
    router.push('/address-detail')
}
function onEdit(_, index) {
    router.push({
        path: '/address-detail',
        query: {
            id: addressList.value[index].id
        }
    })
}
</script>
