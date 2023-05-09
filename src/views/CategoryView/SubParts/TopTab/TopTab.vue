<template>
    <van-tabs class="shadow"
        v-model:active="active"
        color="#10B981"
        @click="tabClick">
        <van-tab v-for="(tab, index) in tabs"
            :key="index"
            :title="tab">
        </van-tab>
    </van-tabs>
</template>

<script setup>
import { ref } from 'vue'

const active = ref(0)
defineProps({
    tabs: {
        type: Array,
        required: true
    }
})
const emit = defineEmits(['changeTab'])

function tabClick() {
    emit('changeTab', active.value)
}
</script>
