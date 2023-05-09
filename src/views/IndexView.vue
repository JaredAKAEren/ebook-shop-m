<template>
    <div class="h-screen">
        <RouterView v-slot="{ Component }">
            <KeepAlive include="HomeView,CategoryView">
                <component :is="Component" />
            </KeepAlive>
        </RouterView>
        <FootMenu />
    </div>
</template>

<script setup>
import FootMenu from '../components/GlobalParts/FootMenu.vue'

</script>
