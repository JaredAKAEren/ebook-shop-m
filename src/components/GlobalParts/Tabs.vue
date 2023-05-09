<template>
    <div class="bg-white">
        <div class="flex">
            <div class="flex-1" v-for="(tab, index) in tabs.titles" :key="index">
                <div class="text-center" @click="tabClick(index)">
                    <span class="inline-block py-2 px-1"
                        :class="{ 'text-primary border-b-4 border-primary': index === tabs.activeIndex }">{{ tab }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    tabs: {
        type: Object,
        required: true
    }
})
const emit = defineEmits(['changeTab'])

function tabClick(index) {
    emit('changeTab', index)
}

</script>
