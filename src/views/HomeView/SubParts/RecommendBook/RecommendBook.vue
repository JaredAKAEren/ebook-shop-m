<template>
    <div class="overflow-x-scroll border-b-8 border-gray-200">
        <div class="inline-flex py-4">
            <div class="w-28 px-1" v-for="(item, index) in recommendList" :key="index">
                <img :src="item.cover_url" :alt="item.title">
                <p class="text-sm text-center truncate">{{ item.title }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    recommendList: {
        type: Array,
        required: true,
        default() {
            return []
        }
    }
})
</script>
