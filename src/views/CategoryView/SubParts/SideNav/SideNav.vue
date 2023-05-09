<template>
    <van-collapse v-model="activeColl" class="h-full shadow-md" @change="resetNav" accordion>
        <van-collapse-item v-for="(rootCat, index) in categroyList" :key="index" :title="rootCat.name" :name="index">
            <van-config-provider :theme-vars="themeVars">
                <van-sidebar v-model="activeSideBar" @change="passCatId">
                    <van-sidebar-item v-for="(cat, index) in rootCat.children" :key="index" :title="cat.name" />
                </van-sidebar>
            </van-config-provider>
        </van-collapse-item>
    </van-collapse>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
    categroyList: {
        type: Array,
        required: true
    }
})
const emits = defineEmits(['passCatId'])

const activeColl = ref(0)
const activeSideBar = ref(0)
const themeVars = ref({
    'sidebar-selected-border-color': '#10B981'
})

// 把 sideNav 对应的 catId 传给父组件以拉取数据
function passCatId() {
    emits('passCatId', props.categroyList[activeColl.value].children[activeSideBar.value].id)
}

// 多个 sideNav 之间切换时，重置 sideNav 的选中项
function resetNav() {
    activeSideBar.value = 0
}

</script>
