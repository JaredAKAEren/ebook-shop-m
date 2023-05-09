<template>
    <HeadNav>
        <template #title>eBook 图书</template>
    </HeadNav>
    <Tabs v-if="isTabShow"
        class="sticky top-12 z-10 shadow-md"
        :tabs="tabs"
        @change-tab="changeContent" />
    <Back2Top v-if="isBack2TopShow"
        @back-to-top="backToTop" />
    <div class="absolute top-12 left-0 right-0 bottom-16 overflow-hidden"
        ref="wrapper">
        <van-config-provider :theme-vars="themeVars">
            <van-skeleton :loading="loading">
                <template #template>
                    <HomeViewSkeleton />
                </template>
                <section>
                    <div ref="tap2Top">
                        <Swipe :banner-list="bannerList" />
                        <RecommendBook :recommend-list="recommendList" />
                    </div>
                    <Tabs :tabs="tabs"
                        @change-tab="changeContent" />
                    <BookList :book-list="bookList" />
                </section>
            </van-skeleton>
        </van-config-provider>
    </div>
</template>

<script setup>
import HeadNav from '@/components/GlobalParts/HeadNav.vue'
import Tabs from '@/components/GlobalParts/Tabs.vue'
import Back2Top from '@/components/GlobalParts/Back2Top.vue'

import BookList from './SubParts/BookList/BookList.vue'
import Swipe from './SubParts/Swipe/Swipe.vue'
import RecommendBook from './SubParts/RecommendBook/RecommendBook.vue'
import HomeViewSkeleton from './SubParts/HomeViewSkeleton/HomeViewSkeleton.vue'

import { getHomeData, getHomeBooks } from '@/api/HomeView'
import { computed, nextTick, onMounted, ref } from 'vue'
import BScroll from '@better-scroll/core'
import Pullup from '@better-scroll/pull-up'

BScroll.use(Pullup)

const bannerList = ref([])
const recommendList = ref([])
const allBookList = ref({
    sales: { books: [], page: 1 },
    new: { books: [], page: 1 },
    recommend: { books: [], page: 1 }
})
const bookList = computed(() => {
    return allBookList.value[order.value].books
})
const tabs = ref({
    activeIndex: 0,
    titles: ['畅销', '新书', '精选']
})
const order = ref('sales')
const loading = ref(true)
const isTabShow = ref(false)
const isBack2TopShow = ref(false)

const themeVars = ref({
    paddingMd: '0'
})

const wrapper = ref(null)
const tap2Top = ref(null)
let bscroll = ref({})

onMounted(() => {
    Promise.all([
        getHomeData(),
        getHomeBooks('sales'),
        getHomeBooks('new'),
        getHomeBooks('recommend')
    ]).then(([homeData, salesBooks, newBooks, recommendBooks]) => {
        bannerList.value = homeData.slides.slice(0, 3)
        recommendList.value = homeData.goods.data
        allBookList.value.sales.books = salesBooks.goods.data
        allBookList.value.new.books = newBooks.goods.data
        allBookList.value.recommend.books = recommendBooks.goods.data
        setTimeout(() => {
            // 所有请求完成后，将 loading 设为 false
            loading.value = false
            nextTick(() => {
                bscroll = new BScroll(wrapper.value, {
                    probeType: 3,
                    click: true,
                    pullUpLoad: true
                })

                bscroll.on('scroll', (position) => {
                    isTabShow.value = (-position.y) > tap2Top.value.offsetHeight
                    isBack2TopShow.value = (-position.y) > wrapper.value.offsetHeight
                })

                bscroll.on('pullingUp', () => {
                    getHomeBooks(order.value, allBookList.value[order.value].page + 1).then(res => {
                        setTimeout(() => {
                            allBookList.value[order.value].books = allBookList.value[order.value].books.concat(res.goods.data)
                            allBookList.value[order.value].page++
                            bscroll.finishPullUp()
                            bsRefresh()
                        }, 600)
                    }).catch((err) => {
                        console.log(err.message)
                    })
                })
            })
        }, 400)
    }).catch(err => {
        console.log(err.message)
    })
})

function changeContent(index) {
    tabs.value.activeIndex = index
    switch (index) {
        case 0:
            order.value = 'sales'
            break
        case 1:
            order.value = 'new'
            break
        case 2:
            order.value = 'recommend'
            break
        default:
            order.value = 'sales'
    }
    bsRefresh()
}

function bsRefresh() {
    nextTick(() => {
        bscroll.refresh()
    })
}

function backToTop() {
    bscroll.scrollTo(0, 0, 500)
}
</script>
