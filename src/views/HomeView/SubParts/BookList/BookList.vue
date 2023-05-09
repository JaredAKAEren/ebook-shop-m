<template>
    <div class="grid grid-cols-2 py-4">
        <BookCard v-for="(book, index) in bookList" :key="index" :book="book"></BookCard>
    </div>
    <Loading />
</template>

<script setup>
import BookCard from './SubParts/BookCard.vue'
import Loading from '@/components/GlobalParts/Loading.vue'

defineProps({
    bookList: {
        type: Array,
        required: true,
        default() {
            return []
        }
    }
})
</script>
