<template>
    <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(item, index) in bannerList" :key="index">
            <img class="mx-auto" :src="item.img_url" :alt="item.title">
        </van-swipe-item>
    </van-swipe>
</template>

<script setup>
defineProps({
    bannerList: {
        type: Array,
        required: true,
        default(){
            return []
        }
    }
})

</script>
