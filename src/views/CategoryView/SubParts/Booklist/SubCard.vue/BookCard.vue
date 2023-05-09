<template>
    <div class="flex bg-gray-100 p-2 rounded-md mb-2"
        @click="go2BookDetil">
        <img :src="book.cover_url"
            alt=""
            class="w-1/3 rounded-md mr-2">
        <div class="flex-1 flex flex-col justify-between text-sm">
            <div class="flex flex-col">
                <span class="font-bold">{{ book.title }}</span>
                <span class="text-gray-500 text-xs">{{ date }}</span>
            </div>
            <div class="flex justify-between">
                <span class="text-red-500 font-bold">￥{{ book.price }}</span>
                <span class="text-yellow-500 font-bold">销量：{{ book.sales }}</span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
    book: {
        type: Object,
        required: true
    }
})

const date = computed(() => {
    return props.book.updated_at.split('T')[0].split('-').join('.')
})

function go2BookDetil() {
    router.push({
        name: 'BookDetail',
        params: {
            id: props.book.id
        }
    })
}
</script>
