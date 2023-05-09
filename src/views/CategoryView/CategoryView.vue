<template>
    <HeadNav>
        <template #title>图书分类</template>
    </HeadNav>
    <main class="h-screen pt-12 pb-16">
        <section class="flex h-full">
            <SideNav class="w-1/3 z-10 overflow-y-scroll"
                :categroy-list="categroyList"
                @pass-cat-id="setCatId"
                @change="get1SubCatData" />
            <div class="flex-1 flex flex-col">
                <TopTab :tabs="tabs"
                    @change-tab="changeTabContent" />
                <van-list class="flex-1 overflow-y-scroll"
                    v-model:loading="loading"
                    :finished="finished"
                    finished-text="没有更多了"
                    :immediate-check="false"
                    :offset="30"
                    @load="onload">
                    <BookList :books="bookListByTab" />
                </van-list>
            </div>
        </section>
    </main>
</template>

<script setup>
import HeadNav from '@/components/GlobalParts/HeadNav.vue'
import TopTab from './SubParts/TopTab/TopTab.vue'

import BookList from './SubParts/Booklist/BookList.vue'
import SideNav from './SubParts/SideNav/SideNav.vue'

import { getCategoryData, getBooksByCategory } from '../../api/CategoryView'
import { computed, nextTick, ref } from 'vue'
import { onMounted } from 'vue'

const categroyList = ref([
    {
        name: '前沿',
        children: [
            {
                name: '区块链'
            },
            {
                name: '人工智能'
            }
        ]
    },
    {
        name: '前端',
        children: [
            {
                name: '小程序'
            },
            {
                name: 'JavaScript'
            },
            {
                name: 'HTML/CSS'
            },
            {
                name: 'Vue'
            },
            {
                name: 'React'
            },
            {
                name: 'ES6'
            },
            {
                name: 'Node.js'
            }
        ]
    },
    {
        name: '后端',
        children: [
            {
                name: 'Java'
            },
            {
                name: 'PHP'
            },
            {
                name: 'Python'
            },
            {
                name: 'Go'
            }
        ]
    },
    {
        name: '云计算',
        children: [
            {
                name: '私有云'
            },
            {
                name: '公有云'
            },
            {
                name: '混合云'
            }
        ]
    },
    {
        name: '产品设计',
        children: [
            {
                name: 'UI设计'
            },
            {
                name: '网站设计'
            }
        ]
    }
])
const tabs = ref(['销量', '价格', '评论'])
const currentCategory = ref(0)
const catBookByAllOrders = ref({
    sales: { books: [], page: 1 },
    price: { books: [], page: 1 },
    comments: { books: [], page: 1 }
})
const order = ref('sales')
// 返回当前选中的 Tab 对应的图书列表
const bookListByTab = computed(() => {
    return catBookByAllOrders.value[order.value].books
})

const loading = ref(false)
const finished = ref(false)

onMounted(() => {
    // 首次载入页面，获取第一个分类的数据，并触发一次滚动加载
    getCategoryData().then(res => {
        categroyList.value = res.categories.slice(0, 5)
        currentCategory.value = res.categories[0].children[0].id
        getNowCatData()
        onload()
    }).catch(err => {
        console.log(err.message)
    })
})

// 获取当前分类的所有排序方式的数据
function getNowCatData() {
    resetAfterCatChange()
    nextTick(() => {
        Promise.all([
            getBooksByCategory('sales', currentCategory.value),
            getBooksByCategory('price', currentCategory.value),
            getBooksByCategory('comments_count', currentCategory.value)
        ]).then(([sales, price, comments]) => {
            catBookByAllOrders.value.sales.books = sales.goods.data
            catBookByAllOrders.value.price.books = price.goods.data
            catBookByAllOrders.value.comments.books = comments.goods.data
            // 如果当前分类下没有图书，则不再触发滚动加载
            // 主要是显示加载完成后的提示
            if (sales.goods.data.length === 0) {
                loading.value = false
                finished.value = true
            }
        }).catch(err => {
            console.log(err.message)
        })
    })
}

// 所有分类共用一个 catBookByAllOrders，切换分类时需要重置页数
function resetAfterCatChange() {
    loading.value = false
    finished.value = false
    for (const item in catBookByAllOrders.value) {
        catBookByAllOrders.value[item].page = 1
    }
}

function onload() {
    setTimeout(() => {
        getBooksByCategory(order.value, currentCategory.value, catBookByAllOrders.value[order.value].page + 1).then(res => {
            if (res.goods.data.length === 0) {
                loading.value = false
                finished.value = true
                return
            }
            catBookByAllOrders.value[order.value].books = catBookByAllOrders.value[order.value].books.concat(res.goods.data)
            catBookByAllOrders.value[order.value].page++
            loading.value = false
        }).catch(err => {
            console.log(err.message)
        })
    }, 600)
}

function changeTabContent(index) {
    order.value = ['sales', 'price', 'comments'][index]
    loading.value = false
    finished.value = false
}

// 将点击 sideNav 时得到的分类 id 保存，并获取该分类的数据
function setCatId(id) {
    currentCategory.value = id
    getNowCatData()
}

// 切换 collapse 时，获取第一个子分类的数据
function get1SubCatData(index) {
    // 重复点击时，index 为 ''，不做处理
    if (index === '') return
    let id = categroyList.value[index].children[0].id
    // 这里的 id === currentCategory.value 应该没有作用了，先留着
    if (id === currentCategory.value || id === undefined) return
    // 将 currentCategory 切换至的打开的 collapse 中以一个分类的 id
    currentCategory.value = id
    getNowCatData()
}
</script>
