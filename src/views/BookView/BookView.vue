<template>
    <HeadNav>
        <template #title>{{ bookTitle }}</template>
    </HeadNav>
    <main class="h-screen pt-12 bg-sh-gray">
        <div class="h-full pb-12 overflow-y-scroll">
            <img :src="bookData.cover_url"
                :alt="bookData.description">
            <van-card :title="bookData.title"
                :desc="bookData.description"
                :price="bookData.price" />
            <div class="sticky top-0">
                <Tabs :tabs="tabs"
                    color="#10B981"
                    @change="switchTab" />
            </div>
            <van-list class="min-h-max">
                <div v-show="isDtShow"
                    v-html="bookData.details"></div>
                <div v-show="isComntShow">评论</div>
                <div v-show="isRelatShow">相关</div>
            </van-list>
        </div>
        <van-action-bar>
            <van-action-bar-icon icon="chat-o"
                text="客服" />
            <van-action-bar-icon icon="cart-o"
                text="购物车" />
            <van-action-bar-icon icon="star"
                text="收藏" />
            <van-action-bar-button type="warning"
                text="加入购物车"
                @click="add2Cart" />
            <van-action-bar-button type="danger"
                text="立即购买" />
        </van-action-bar>
    </main>
</template>

<script setup>
import HeadNav from '../../components/GlobalParts/HeadNav.vue'
import Tabs from '../../components/GlobalParts/Tabs-temp.vue'
import { getBookDetil } from '../../api/BookView'
import { addToCartList } from '../../api/CartView'
import { showLoading } from '../../utils'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import { computed } from 'vue'

const route = useRoute()

const bookData = ref({})
const bookTitle = computed(() => {
    return bookData.value.title
})
const currentTab = ref(0)
const tabs = ref(['概述', '热评', '相关图书'])
const isDtShow = computed(() => currentTab.value === 0)
const isComntShow = computed(() => currentTab.value === 1)
const isRelatShow = computed(() => currentTab.value === 2)

onMounted(() => {
    getBookDetil(route.params.id).then(res => {
        bookData.value = res.goods
    })
})

function switchTab(index) {
    currentTab.value = index
}

function add2Cart() {
    showLoading('添加中...', toast => {
        addToCartList(route.params.id).then(res => {
            if (res === '') {
                toast.message = '添加成功'
                setTimeout(() => {
                    toast.close()
                }, 400)
            }
        })
    })
}

</script>
