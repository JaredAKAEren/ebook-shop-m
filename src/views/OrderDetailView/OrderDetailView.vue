<template>
    <HeadNav>
        <template #title>订单详情</template>
    </HeadNav>
    <main class="h-screen pt-12 bg-sh-gray">
        <section class="bg-white flex flex-col rounded-md py-2 px-4 shadow-sm m-2">
            <div class="text-sm">
                <div class="flex">
                    <span class="text-gray-600">订单状态：</span>
                    <p>{{ orderStatus }}</p>
                </div>
                <div class="flex">
                    <span class="text-gray-600">订单编号：</span>
                    <p>{{ orderInfo.order_no }}</p>
                </div>
                <div class="flex">
                    <span class="text-gray-600">下单时间：</span>
                    <p>{{ orderInfo.created_at }}</p>
                </div>
            </div>
            <div v-if="orderInfo.status === 1"
                class="mt-2">
                <van-button block
                    plain
                    type="primary"
                    @click="payShow = true">去支付</van-button>
            </div>
        </section>
        <section class="bg-white flex flex-col rounded-md py-2 px-4 shadow-sm m-2">
            <div class="text-sm mt-4">
                <div class="flex">
                    <span class="text-gray-600">商品金额：</span>
                    <p>￥{{ orderInfo.amount }}</p>
                </div>
                <div class="flex">
                    <span class="text-gray-600">配送方式：</span>
                    <p>￥{{ orderInfo.amount }}</p>
                </div>
            </div>
            <div class="mt-4">
                <div class="w-full inline-flex p-2 mb-2 rounded-md bg-sh-gray"
                    v-for="(book, index) in orderGoods"
                    :key="index">
                    <img class="w-1/5 py-1 bg-white rounded-md"
                        :src="book.goods.cover_url"
                        :alt="book.goods.description">
                    <div class="flex-1 flex flex-col justify-around ml-1">
                        <h3 class="text-sm">{{ book.goods.title }}</h3>
                        <p class="text-sm text-red-500 font-bold">￥{{ book.goods.price }}</p>
                    </div>
                    <div class="flex flex-col justify-around">
                        <p class="text-xs text-end text-gray-500"><small class="text-xs mr-px">x</small>{{ book.num }}
                        </p>
                    </div>
                </div>
            </div>
        </section>

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

import { getOrder, updateOrderStatusToPaid } from '../../api/OrderView'
import { showLoading } from '../../utils'

import { useRoute } from 'vue-router'
import { onMounted, ref, computed } from 'vue'

const route = useRoute()

const orderInfo = ref({
    status: 0
})
const orderGoods = ref([])
const payShow = ref(false)
const payOptions = ref([
    { name: '支付宝', icon: 'qrcode', type: 'aliyun' }
])

const orderStatus = computed(() => {
    switch (orderInfo.value.status) {
        case 1:
            return '待付款'
        case 2:
            return '已付款'
        case 3:
            return '待收货'
        case 4:
            return '已完成'
        case 5:
            return '过期'
        default:
            return '未知'
    }
})

onMounted(() => {
    init()
})

function init() {
    getOrder(route.query.id).then(res => {
        console.log(res)
        orderInfo.value = res
        orderGoods.value = res.orderDetails.data
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
                    payShow.value = false
                    init()
                }, 1000)
            }).catch(err => {
                console.log(err.message)
            })
        })
    }
}

</script>
