<template>
    <div class="flex flex-col items-center mx-4"
        @click="go2BookDetil">
        <div>
            <img :src="book.cover_url"
                :alt="book.description">
        </div>
        <div>
            <p>{{ book.title }}</p>
        </div>
        <div>
            <span class="text-red-500 mr-2"><small>￥</small>{{ book.price }}</span>
            <span class="text-sm text-gray-500">
                <i class="iconfont icon-star text-yellow-400 -mr-px"></i>
                {{ book.collects_count }}
            </span>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
    book: {
        type: Object,
        required: true,
        default() {
            return {}
        }
    }
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
