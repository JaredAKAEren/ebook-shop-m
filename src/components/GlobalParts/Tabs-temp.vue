<template>
    <van-tabs v-model:active="active">
            <van-tab v-for="(tab, index) in tabs"
                :key="index"
                :title="tab">
            </van-tab>
    </van-tabs>
</template>

<script setup>
import { ref } from 'vue'

const active = ref(0)
const props = defineProps({
    tabs: {
        type: Array,
        required: true,
    },
    activeColor: {
        type: String
    }
})

</script>
