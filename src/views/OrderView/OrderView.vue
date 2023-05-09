<template>
    <HeadNav>
        <template #title>订单管理</template>
    </HeadNav>
    <main class="h-screen w-full pt-12 bg-sh-gray inline-flex flex-col">
        <van-tabs v-model:active="active"
            @change="onTabChange">
            <van-tab v-for="(tab, index) in tabsList"
                :key="index"
                :title="tab.name">
            </van-tab>
        </van-tabs>
        <van-list class="p-2 flex-1 overflow-y-scroll"
            v-model:loading="loading"
            :finished="finished"
            finished-text="没有更多了"
            :immediate-check="false"
            :offset="0"
            @load="onload">
            <OrderList :order-list="orderList" />
        </van-list>
    </main>
</template>

<script setup>
import HeadNav from '@/components/GlobalParts/HeadNav.vue'
import OrderList from './SubParts/OrderList.vue'

import { getOrders } from '../../api/OrderView'

import { ref, onMounted, computed } from 'vue'

const active = ref(0)
const tabsList = ref([
    { name: '全部', tag: 'all', status: '' },
    { name: '待付款', tag: 'payYet', status: 1 },
    { name: '已付款', tag: 'payDone', status: 2 },
    { name: '待收货', tag: 'delivering', status: 3 },
    { name: '已完成', tag: 'signAfter', status: 4 },
    { name: '过期', tag: 'pastDue', status: 5 }
])
const orders = ref({
    all: {
        data: [],
        page: 1,
        total: 1
    },
    payYet: {
        data: [],
        page: 1,
        total: 1
    },
    payDone: {
        data: [],
        page: 1,
        total: 1
    },
    delivering: {
        data: [],
        page: 1,
        total: 1
    },
    signAfter: {
        data: [],
        page: 1,
        total: 1
    },
    pastDue: {
        data: [],
        page: 1,
        total: 1
    }
})

const currentTag = ref('all')
const orderList = computed(() => {
    return orders.value[currentTag.value].data
})

const loading = ref(false)
const finished = ref(false)

onMounted(() => {
    getOrders().then(res => {
        formatResData('all', res)
    }).catch(err => {
        console.log(err.message)
    })
})

function formatResData(tag, res) {
    if (res.data.length === 0) {
        loading.value = false
        finished.value = true
        return
    }
    orders.value[tag].page = res.meta.pagination.current_page
    orders.value[tag].total = res.meta.pagination.total_pages
    if (orders.value[tag].page > 1) {
        orders.value[tag].data = orders.value[tag].data.concat(res.data)
    } else {
        orders.value[tag].data = res.data
    }
}

function onTabChange(name) {
    loading.value = false
    finished.value = false
    currentTag.value = tabsList.value[name].tag
    if (orders.value[currentTag.value].data.length === 0) {
        getOrders(tabsList.value[name].status).then(res => {
            formatResData(currentTag.value, res)
        }).catch(err => {
            console.log(err.message)
        })
    }
}

function onload() {
    setTimeout(() => {
        if (orders.value[currentTag.value].page >= orders.value[currentTag.value].total) {
            finished.value = true
            loading.value = false
            return
        }
        getOrders(tabsList.value[active.value].status, orders.value[currentTag.value].page + 1).then(res => {
            formatResData(currentTag.value, res)
            loading.value = false
        }).catch(err => {
            console.log(err.message)
        })
    }, 400)
}
</script>
