<template>
    <div class="fixed bottom-0 shadow w-full z-20 bg-gray-100 h-16 flex items-center border-t border-gray-200">
        <ul class="flex w-full">
            <li class="flex-1" v-for="(link, index) in links" :key="index">
                <RouterLink :to="link.path" custom v-slot="{ isActive, href, navigate }">
                    <a :href="href" @click="navigate" class="flex flex-col items-center"
                        :class="{ 'text-primary': isActive }">
                        <i class="text-2xl" :class="link.iconfont"></i>
                        <div class="text-sm">{{ link.name }}</div>
                    </a>
                </RouterLink>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const links = ref([
    {
        name: '首页',
        path: '/home',
        iconfont: 'iconfont icon-homepage'
    },
    {
        name: '分类',
        path: '/category',
        iconfont: 'iconfont icon-Category'
    },
    {
        name: '购物车',
        path: '/cart',
        iconfont: 'iconfont icon-cart'
    },
    {
        name: '我的',
        path: '/user',
        iconfont: 'iconfont icon-user'
    }
])

</script>
