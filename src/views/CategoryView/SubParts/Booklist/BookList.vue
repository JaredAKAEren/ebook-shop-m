<template>
    <div class="px-2 pt-4">
        <BookCard v-for="(book, index) in books" :key="index" :book="book" />
    </div>
</template>

<script setup>
import BookCard from './SubCard.vue/BookCard.vue'

defineProps({
    books: {
        type: Array,
        required: true
    }
})

</script>
