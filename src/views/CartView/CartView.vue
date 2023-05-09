<template>
    <HeadNav>
        <template #title>购物车</template>
    </HeadNav>
    <main class="h-screen pt-12 pb-28 overflow-y-scroll bg-sh-gray">
        <van-list class="m-2">
            <van-checkbox-group ref="checkGroupElm"
                v-model="groupChecked">
                <div class="mb-2 shadow-sm rounded-lg overflow-auto"
                    v-for="(book, index) in cartList"
                    :key="index">
                    <van-swipe-cell :before-close="beforeClose"
                        :name="index">
                        <div class="w-full inline-flex px-4 py-2 bg-white">
                            <van-checkbox :name="book.id"
                                @click="groupCheckedChange"></van-checkbox>
                            <img class="w-1/4 py-1 bg-white rounded-md"
                                :src="book.goods.cover_url"
                                :alt="book.goods.description">
                            <div class="flex-1 flex flex-col justify-around ml-1">
                                <h3>{{ book.goods.title }}</h3>
                                <p class="text-sm text-red-500 font-bold">￥{{ book.goods.price }}</p>
                            </div>
                            <div class="flex flex-col justify-around">
                                <p class="text-sm text-end text-red-500 font-bold">￥{{ book.num * book.goods.price }}</p>
                                <van-stepper v-model="book.num"
                                    @change="numChange(book.id)" />
                            </div>
                        </div>
                        <template #right>
                            <van-button class="h-full border-none text-white bg-red-500"
                                square
                                text="删除" />
                        </template>
                    </van-swipe-cell>
                </div>
            </van-checkbox-group>
        </van-list>
        <van-submit-bar class="bottom-16"
            :price="totalPrice"
            button-text="提交订单"
            @submit="onOrderSubmit">
            <van-checkbox v-model="allChecked"
                @click="allCheckedChange">全选</van-checkbox>
        </van-submit-bar>
    </main>
</template>

<script setup>
import HeadNav from '@/components/GlobalParts/HeadNav.vue'
import { showConfirmDialog } from 'vant'

import { getCartListWithBooks } from '../../api/CartView'
import { removeBookFromCart, updateCartNum, updateCartChecked } from '../../api/CartView'
import { showLoading } from '../../utils'

import { onMounted, ref, computed } from 'vue'
import { watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const checkGroupElm = ref(null)
const groupChecked = ref([])
const allChecked = ref(false)
const cartList = ref([])
const totalPrice = computed(() => {
    return cartList.value.filter(item => item.is_checked === 1).reduce((acc, cur) => {
        return acc + cur.num * cur.goods.price
    }, 0) * 100
})

onMounted(() => {
    getCartListWithBooks().then(res => {
        cartList.value = res.data
        groupChecked.value = res.data.filter(item => item.is_checked === 1).map(item => item.id)
    }).catch(err => {
        console.log(err.message)
    })
})

watch(groupChecked, (val) => {
    if (cartList.value.length === 0 || val.length !== cartList.value.length) {
        allChecked.value = false
    } else {
        allChecked.value = true
    }
})

const beforeClose = ({ name, position }) => {
    switch (position) {
        case 'cell':
        case 'outside':
            return true
        case 'right':
            showConfirmDialog({
                title: '确定删除吗？',
            }).then(() => {
                clickDelete(name)
            }).catch(() => {
                // on cancel
            })
    }
}

function clickDelete(index) {
    let id = cartList.value[index].id
    removeBookFromCart(id).then(res => {
        if (res === '') {
            cartList.value.splice(index, 1)
        }
    }).catch(err => {
        console.log(err.message)
    })
}

function numChange(id) {
    showLoading('更改中...', toast => {
        updateCartNum(id, cartList.value.find(item => item.id === id).num).then(res => {
            if (res === '') {
                toast.close()
            }
        }).catch(err => {
            console.log(err.message)
        })
    })
}

function groupCheckedChange() {
    showLoading('更改中...', toast => {
        updateCartChecked(groupChecked.value).then(res => {
            if (res === '') {
                updateCheckedLocal()
                toast.close()
            }
        }).catch(err => {
            console.log(err.message)
        })
    })
}

function allCheckedChange() {
    if (allChecked.value) {
        checkGroupElm.value.toggleAll(true)
    } else {
        checkGroupElm.value.toggleAll(false)
    }
    groupCheckedChange()
}

function updateCheckedLocal() {
    cartList.value.forEach(item => {
        if (groupChecked.value.includes(item.id)) {
            item.is_checked = 1
        } else {
            item.is_checked = 0
        }
    })
}

function onOrderSubmit() {
    router.push('/order-preview')
}

</script>

