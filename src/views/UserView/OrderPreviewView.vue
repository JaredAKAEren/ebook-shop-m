<template>
    <HeadNav>
        <template #title>订单预览</template>
    </HeadNav>
    <main class="bg-sh-gray h-screen py-12 flex">
        <van-list class="overflow-y-scroll p-2">
            <div class="flex bg-white mb-4 mt-2 rounded-md shadow-sm p-4 border-l-4 rounded-l-md border-blue-500">
                <div class="flex flex-col flex-1 text-sm">
                    <div class="flex text-lg items-center">
                        <p>{{ addInfo.name }}</p>
                        <span class="text-xs bg-blue-500 text-white ml-2 px-2 py-px rounded-full ">默认</span>
                    </div>
                    <div class="flex mt-2">
                        <p>{{ addInfo.address }}</p>
                    </div>
                </div>
                <van-icon class="text-lg text-gray-500 font-bold self-center"
                    name="arrow" />
            </div>

            <div class="mb-2 mx-2 shadow-sm rounded-lg overflow-auto"
                v-for="(book, index) in books"
                :key="index">
                <div class="w-full inline-flex px-4 py-2 bg-white">
                    <img class="w-1/4 py-1 bg-white rounded-md"
                        :src="book.goods.cover_url"
                        :alt="book.goods.description">
                    <div class="flex-1 flex flex-col justify-around ml-1">
                        <h3>{{ book.goods.title }}</h3>
                        <p class="text-sm text-red-500 font-bold">￥{{ book.goods.price }}</p>
                    </div>
                    <div class="flex flex-col justify-around">
                        <p class="text-xs text-end text-gray-500"><small class="text-xs mr-px">x</small>{{ book.num }}</p>
                    </div>
                </div>
            </div>
        </van-list>

        <van-submit-bar class="shadow"
            :price="totalPrice"
            button-text="去支付"
            @submit="onOrderSubmit">
            <p class="pt-1">共 <strong>{{ books.length }}</strong> 件商品</p>
        </van-submit-bar>
        <van-share-sheet v-model:show="payShow"
            title="请选择支付方式"
            :options="payOptions"
            cancel-text="取消支付"
            :close-on-click-overlay="false"
            @select="onSelect" />
    </main>
</template>

<script setup>
import HeadNav from '@/components/GlobalParts/HeadNav.vue'

import { getOrderPreview, createOrder, updateOrderStatusToPaid } from '../../api/OrderView'
import { showLoading } from '../../utils'

import { onMounted, computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const address = ref({})
const books = ref([])
const orderInfo = ref({})
const payShow = ref(false)
const payOptions = ref([
    { name: '支付宝', icon: 'qrcode', type: 'aliyun' }
])

const addInfo = computed(() => {
    return {
        name: `${address.value.name} ${address.value.phone}`,
        address: `${address.value.province} ${address.value.city} ${address.value.county} ${address.value.address}`
    }
})
const totalPrice = computed(() => {
    return books.value.reduce((acc, cur) => {
        return acc + cur.num * cur.goods.price
    }, 0) * 100
})

onMounted(() => {
    getOrderPreview().then(res => {
        address.value = res.address.find(item => item.is_default)
        books.value = res.carts
    }).catch(err => {
        console.log(err.message)
    })
})

function onOrderSubmit() {
    payShow.value = true
    createOrder(address.value.id).then(res => {
        console.log(res)
        orderInfo.value = res
    }).catch(err => {
        console.log(err.message)
    })
}

function onSelect(option) {
    if (orderInfo.value.id) {
        showLoading('支付中...', toast => {
            updateOrderStatusToPaid(orderInfo.value.id, option.type).then(res => {
                console.log(res)
                toast.message = '支付成功，跳转中...'
                setTimeout(() => {
                    toast.close()
                    router.replace({
                        path: '/order-detail',
                        query: {
                            id: orderInfo.value.id
                        }
                    })
                }, 1000)
            }).catch(err => {
                console.log(err.message)
            })
        })
    }
}
</script>
