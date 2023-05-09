<template>
    <div class="mb-4"
        v-for="(order, index) in orderList"
        :key="index">
        <section class="bg-gray-200 flex items-center py-2 px-4 mb-2 rounded-md text-sm text-gray-800">
            <div class="flex-1">
                <div class="flex mb-2">
                    <span>订单号：</span>
                    <p>{{ order.order_no }}</p>
                </div>
                <div class="flex">
                    <span>创建时间：</span>
                    <p>{{ order.created_at }}</p>
                </div>
            </div>
            <div>
                <van-icon class="text-lg text-gray-500 font-bold self-center"
                    name="arrow"
                    @click="gotoDetail(order.id)" />
            </div>
        </section>
        <section class="px-4">
            <div class="w-full inline-flex px-4 mb-2 py-1 rounded-md bg-white"
                v-for="(book, index) in order.orderDetails.data"
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
        </section>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

defineProps({
    orderList: {
        type: Array,
        default: []
    }
})

function gotoDetail(id){
    router.push({
        path: '/order-detail',
        query: {
            id
        }
    })
}
</script>
