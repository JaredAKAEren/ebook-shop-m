<template>
    <div class="fixed bottom-20 right-6 z-20 bg-green-50 h-12 w-12 flex justify-center items-center rounded-full shadow-md border-4 border-green-100"
        @click="backToTop">
        <i class="iconfont icon-up font-bold text-primary"></i>
    </div>
</template>

<script setup>
const emit = defineEmits(['backToTop'])

function backToTop() {
    emit('backToTop')
}
</script>
