<template>
    <div class="fixed top-0 z-20 flex w-screen h-12 bg-primary shadow-md">
        <div class="absolute top-0 bottom-0 left-0 px-3 flex items-center"
            @click="goBack">
            <i class="iconfont icon-i-left text-white text-2xl "></i>
        </div>
        <p class="flex w-full justify-center items-center">
            <span class="text-white text-lg">
                <slot name="title">eBook 图书</slot>
            </span>
        </p>
    </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import { ref } from 'vue'

const router = useRouter()
const route = useRoute()
const notAllowBack = ref(['/', '/home', '/index', '/category', '/cart', '/user'])

function goBack() {
    if (notAllowBack.value.includes(route.fullPath)) return
    router.go(-1)
}
</script>
